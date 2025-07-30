import { _decorator, Camera, Component, Node, UITransform, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('follow')
export class follow extends Component {
    // @property({ type: Node })
    playerNode: Node = null

    // @property({ type: Camera })
    mainCamera: Camera = null // 3D摄像机

    // @property({ type: Node })
    canvasNode: Node = null // Canvas节点

    // 头顶偏移
    private _offset: Vec3 = new Vec3(0, 2, 0)

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
    }

    // update
    update(dt: number) {
        if (!this.playerNode || !this.mainCamera || !this.canvasNode) return

        // 1. 计算头顶世界坐标
        const headWorldPos = this.playerNode
            .getWorldPosition()
            .add(this._offset)

        // 2. 世界坐标转屏幕坐标
        const screenPos = new Vec3()
        this.mainCamera.worldToScreen(headWorldPos, screenPos)
        // console.log('screenPos', screenPos)

        // 3. 屏幕坐标转UI坐标
        const canvasUITrans = this.canvasNode.getComponent(UITransform)
        const widgetPos = canvasUITrans.convertToNodeSpaceAR(
            new Vec3(screenPos.x, screenPos.y, 0)
        )

        // console.log('widgetPos', widgetPos)
        // 4. 设置UI节点位置
        this.node.setPosition(widgetPos)
    }
}
