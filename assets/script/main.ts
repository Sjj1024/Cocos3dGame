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
    Prefab,
    Quat,
    tween,
    Vec3,
} from 'cc'
import { follow } from './follow'
import { EventListener, EventName } from './utils/EventListener'
import { role } from './role'
const { ccclass, property } = _decorator

/**
 * 正视角相机位置：(50,30,0)，旋转角度（-30,90,0）
 * 左侧视角相机位置：(0,30,40)，旋转角度（-30,0,0）
 * 右侧视角相机位置：(0,30,-40)，旋转角度（-30,180,0）
 * 俯视角相机位置：(0,36,0)，旋转角度（-90,0,0）
 */

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

    // 昵称和玩家节点映射
    private nickNameToPlayerNode = new Map<string, Node>()

    // 选中的玩家
    private selectedPlayer: any = null

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

    // 切换到正视角
    switchToFrontView() {
        // this.mainCamera.node.setPosition(50, 30, 0)
        // this.mainCamera.node.setRotationFromEuler(-30, 90, 0)
        const quat = new Quat()
        Quat.fromEuler(quat, -30, 90, 0)
        tween(this.mainCamera.node)
            .to(0.5, {
                position: new Vec3(50, 30, 0),
                rotation: quat,
            })
            .start()
    }

    // 切换到左侧视角
    switchToLeftView() {
        // this.mainCamera.node.setPosition(0, 30, 40)
        // this.mainCamera.node.setRotationFromEuler(-30, 0, 0)
        const quat = new Quat()
        Quat.fromEuler(quat, -30, 0, 0)
        tween(this.mainCamera.node)
            .to(0.5, {
                position: new Vec3(0, 30, 40),
                rotation: quat,
            })
            .start()
    }

    // 切换到右侧视角
    switchToRightView() {
        // this.mainCamera.node.setPosition(0, 30, -40)
        // this.mainCamera.node.setRotationFromEuler(-30, 180, 0)
        const quat = new Quat()
        Quat.fromEuler(quat, -30, 180, 0)
        tween(this.mainCamera.node)
            .to(0.5, {
                position: new Vec3(0, 30, -40),
                rotation: quat,
            })
            .start()
    }

    // 切换到俯视角
    switchToTopView() {
        // this.mainCamera.node.setPosition(0, 36, 0)
        // this.mainCamera.node.setRotationFromEuler(-90, 0, 0)
        const quat = new Quat()
        Quat.fromEuler(quat, -90, 0, 0)
        tween(this.mainCamera.node)
            .to(0.5, {
                position: new Vec3(0, 36, 0),
                rotation: quat,
            })
            .start()
    }

    // 随机让某个玩家节点变大
    scalePlayer() {
        const randomNickName =
            this.nickNameToPlayerNode.keys[
                Math.floor(
                    Math.random() * this.nickNameToPlayerNode.keys.length
                )
            ]
        const playerNode: any = this.nickNameToPlayerNode.get(randomNickName)
        if (playerNode) {
            tween(playerNode)
                .to(1, { scale: new Vec3(3, 3, 3) })
                .start()
        }
        // tween(playerNode)
        //     .to(1, { scale: new Vec3(scaleNumber, scaleNumber, scaleNumber) })
        //     .start()
    }

    // 直线运动
    linearMove() {
        console.log('linearMove')
    }

    // 直线加速
    linearAccelerate() {
        console.log('linearAccelerate')
        if (this.selectedPlayer) {
            this.selectedPlayer.getComponent(role).setSpeed(20)
        }
    }

    // 变大加速
    scaleAccelerate() {
        console.log('scaleAccelerate')
        if (this.selectedPlayer) {
            tween(this.selectedPlayer)
                .to(1, { scale: new Vec3(4, 4, 4) })
                .start()
        }
    }

    // 变大加速，给近景
    scaleAccelerateNear() {
        console.log('scaleAccelerateNear')
    }

    // 随机选人
    randomSelectPlayer() {
        const nickNames = this.nickNameToPlayerNode.keys()
        // 1. 将 Map 的 key 迭代器转换为数组
        const keysArray = Array.from(nickNames)
        // 2. 生成一个随机索引
        const randomIndex = Math.floor(Math.random() * keysArray.length)
        // 3. 获取随机的 key
        const randomKey = keysArray[randomIndex]
        console.log('randomSelectPlayer', randomKey)
        this.selectedPlayer = this.nickNameToPlayerNode.get(randomKey)
    }

    // 暂停
    pause() {
        // game.pause()
        console.log('pause')
    }

    // 加人
    addPlayer() {
        console.log('addPlayer')
        this.createPlayer()
    }

    // 结束
    endGame() {
        console.log('endGame')
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

        // 将玩家昵称和玩家节点映射
        this.nickNameToPlayerNode.set(nickName, playerNode)

        // tween(playerNode)
        //     .to(1, { scale: new Vec3(3, 3, 3) })
        //     .start()
    }

    update(deltaTime: number) {}
}
