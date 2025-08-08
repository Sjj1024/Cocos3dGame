import {
    _decorator,
    Camera,
    Component,
    EventKeyboard,
    game,
    input,
    Input,
    instantiate,
    KeyCode,
    Label,
    Node,
    Prefab,
} from 'cc'
import { follow } from './follow'
import { EventListener, EventName } from './utils/EventListener'
import { role } from './role'
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
    mainCamera: Camera = null

    // 玩家序号
    private playerIndex = 0

    // 计时器
    @property
    private timerSecond = 120

    // 玩家昵称列表
    private nickNameList = [
        '筷嚛',
        '团子',
        '袜子激推',
        '天赋极高',
        '黄博杨',
        'Tom',
        '艾诺',
        '瑞纳德',
        'Kurrr',
        'DNTO',
        'Andre',
        'Ethan',
        '李晨',
        '湾湾',
        '洗心革面',
        '小青蛙110',
        '李的传人',
        'may',
        '小北',
        '台南哭',
        'ww',
        'oscar',
        '114514',
        '老黑',
        '我',
        '1小超人',
        '津门强',
        'owen',
        '亮亮',
        '大小宝',
        '沈宝',
        '小贝壳',
        '大宝',
        '大宝',
        '元',
        '维尼',
        '品灵',
        '玛妮啦',
        '危险流浪者',
        '能量战神',
        '冰冰',
        '大雄',
        '吉米',
        'Eva',
        '卜宽',
        '小辉哥',
        'Adam',
        'Blair',
        '12345上山',
        'Bella-贝',
        '周',
        '冰',
        '大冰',
        'Ggggg',
        'Hhhh',
        '自責自責',
        '清风',
        '七七777',
        '16的四次方',
        '小锦鲤',
        '哈哈哈',
        '之人',
        '文文',
        '杰瑞Yutou',
        '喵喵淼淼',
        '童',
        'Koi',
        'lee',
        '陌生人',
        'Koi',
        '冰哥',
        '彪彬',
        '柠檬',
        '小北',
        'Fyudtuf',
        'Koi',
        'Elaine',
        '研子',
        '小金鱼',
        'NOT Cor',
        '喵喵',
        '安安',
        '小熊',
        'Tom',
        '宸宸',
        'haHad',
        '然然',
        '罗释苀',
        '孙小豆',
        '一拳',
        'wan.',
        'Mandy',
        '文森特',
        '子扬',
        '桐桐',
        'jz',
        'Daniel',
    ]

    start() {
        // 监听按键输入
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        EventListener.dispatch(EventName.TIMER_START, this.timerSecond)
        this.schedule(this.countDown, 1)
    }

    // 倒计时
    countDown() {
        this.timerSecond--
        EventListener.dispatch(EventName.TIMER_LABEL, this.timerSecond)
        if (this.timerSecond <= 0) {
            this.timerSecond = 0
            game.pause()
        }
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
        // 创建玩家昵称
        const nameNode = instantiate(this.namePrefab)
        // 获取follow组件
        const followComp = nameNode.getComponent(follow)
        // 设置玩家昵称
        this.playerIndex++
        // const nickName = `1024小神${this.playerIndex}`
        const nickName = this.nickNameList[this.playerIndex]
        const nameLabel = nameNode.getComponent(Label)
        nameLabel.string = nickName
        // 注册玩家
        EventListener.dispatch(EventName.REGIST_ROLE, { nickName, score: 0 })
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
        // 设置昵称
        playerNode.getComponent(role).setNickName(nickName)
        // 设置玩家节点
        followComp.setPlayerNode(playerNode)
        // 设置3D摄像机
        followComp.setMainCamera(this.mainCamera)
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
