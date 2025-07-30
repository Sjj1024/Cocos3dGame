import {
    _decorator,
    Camera,
    Component,
    EventKeyboard,
    input,
    Input,
    instantiate,
    KeyCode,
    Label,
    Node,
    Prefab,
} from 'cc'
import { follow } from './follow'
const { ccclass, property } = _decorator

@ccclass('main')
export class main extends Component {
    // 戴安娜
    @property(Prefab)
    public dianaPrefab: Prefab = null

    // 琳恩
    @property(Prefab)
    public lennPrefab: Prefab = null

    // 瑞恩
    @property(Prefab)
    public ryanPrefab: Prefab = null

    // 维多利亚
    @property(Prefab)
    public victoriaPrefab: Prefab = null

    // 玩家昵称预制体
    @property(Prefab)
    public namePrefab: Prefab = null

    @property({ type: Camera })
    mainCamera: Camera = null // 3D摄像机

    // 玩家序号
    private playerIndex = 0

    start() {
        // 监听按键输入
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_P:
                console.log('P key pressed')
                this.createPlayer()
                break
        }
    }

    // 创建玩家
    createPlayer() {
        // 创建玩家
        let playerNode = null
        switch (this.playerIndex % 4) {
            case 0:
                playerNode = instantiate(this.dianaPrefab)
                break
            case 1:
                playerNode = instantiate(this.lennPrefab)
                break
            case 2:
                playerNode = instantiate(this.ryanPrefab)
                break
            case 3:
                playerNode = instantiate(this.victoriaPrefab)
                break
        }
        // 创建玩家昵称
        const nameNode = instantiate(this.namePrefab)
        // 获取follow组件
        const followComp = nameNode.getComponent(follow)
        // 设置玩家节点
        followComp.setPlayerNode(playerNode)
        // 设置3D摄像机
        followComp.setMainCamera(this.mainCamera)
        // 设置玩家昵称
        this.playerIndex++
        const nameLabel = nameNode.getComponent(Label)
        nameLabel.string = `1024小神${this.playerIndex}`
        // 将玩家昵称添加到canvas节点
        const canvasNode = this.node.getChildByName('Canvas')
        nameNode.setParent(canvasNode)

        // 将玩家添加到Person节点
        const personNode = this.node.getChildByName('Person')
        playerNode.setParent(personNode)
        // 设置玩家位置
        playerNode.setPosition(0, 5, 0)
    }

    update(deltaTime: number) {}
}
