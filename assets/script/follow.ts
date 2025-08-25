import {
    _decorator,
    Camera,
    Component,
    Node,
    UITransform,
    Vec3,
    view,
} from 'cc'
const { ccclass, property } = _decorator

@ccclass('follow')
export class follow extends Component {
    @property({ type: Node })
    playerNode: Node = null

    @property({ type: Camera })
    mainCamera: Camera = null

    @property({ type: Node })
    canvasNode: Node = null // Canvas节点

    // 头顶偏移
    private _offset: Vec3 = new Vec3(0, 2, 0)

    // 屏幕适配相关
    private _designResolution = new Vec3()
    private _screenResolution = new Vec3()
    private _scaleRatio = new Vec3(1, 1, 1)

    // 动态设置玩家节点
    public setPlayerNode(playerNode: Node) {
        if (this.playerNode) return
        this.playerNode = playerNode
    }

    // 动态设置3D摄像机
    public setMainCamera(mainCamera: Camera) {
        if (this.mainCamera) return
        this.mainCamera = mainCamera
    }

    start() {
        this.canvasNode = this.node.parent
        // 获取设计分辨率
        const canvasTrans = this.canvasNode.getComponent(UITransform)
        this._designResolution.set(canvasTrans.width, canvasTrans.height, 0)

        // 初始计算屏幕适配比例
        this.calculateScreenRatio()
    }

    update(dt: number) {
        if (!this.playerNode || !this.mainCamera || !this.canvasNode) return
        // 1. 获取头顶世界坐标
        const headWorldPos = new Vec3()
        this.playerNode.getWorldPosition(headWorldPos)
        headWorldPos.add(this._offset)

        // 2. 世界坐标 -> 屏幕坐标（物理像素）
        const screenPos = new Vec3()
        this.mainCamera.worldToScreen(headWorldPos, screenPos)

        // 3. 屏幕坐标 转换到设计分辨率坐标
        const visibleSize = view.getVisibleSize()
        const canvasTrans = this.canvasNode.getComponent(UITransform)!

        const designX = (screenPos.x / visibleSize.width) * canvasTrans.width
        const designY = (screenPos.y / visibleSize.height) * canvasTrans.height

        // 4. 把设计分辨率坐标转换为 UI 本地坐标
        const uiPos = new Vec3(
            designX - canvasTrans.width / 2,
            designY - canvasTrans.height / 2,
            0
        )
        // 5. 设置UI节点位置
        this.node.setPosition(uiPos)
    }

    // 计算屏幕适配比例
    private calculateScreenRatio() {
        const visibleSize = view.getVisibleSize()
        this._screenResolution.set(visibleSize.width, visibleSize.height, 0)

        // 计算宽高比例
        this._scaleRatio.x = this._screenResolution.x / this._designResolution.x
        this._scaleRatio.y = this._screenResolution.y / this._designResolution.y
    }

    // 当屏幕尺寸变化时重新计算比例
    onResize() {
        this.calculateScreenRatio()
    }
}
