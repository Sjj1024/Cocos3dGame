import { _decorator, Component, Label } from 'cc'
import { EventListener, EventName } from './utils/EventListener'
const { ccclass, property } = _decorator

@ccclass('uidata')
export class uidata extends Component {
    @property(Label)
    public firstName: Label = null

    @property(Label)
    public secondName: Label = null

    @property(Label)
    public thirdName: Label = null

    @property(Label)
    public fourthName: Label = null

    @property(Label)
    public timerLabel: Label = null

    private _roleList: { nickName: string; score: number }[] = [
        {
            nickName: '',
            score: 0,
        },
    ]

    start() {
        // console.log('uidata start')
        EventListener.on(EventName.TIMER_START, this.timerStart, this)
        EventListener.on(EventName.TIMER_STOP, this.timerStop, this)
        EventListener.on(EventName.TIMER_LABEL, this.timerLabelOn, this)
        EventListener.on(EventName.REGIST_ROLE, this.registRole, this)
        EventListener.on(EventName.COLIDER_EVENT, this.coliderEvent, this)
    }

    registRole(data: any) {
        // console.log('registRole', data)
        // 如果昵称已存在，则更新分数
        const existRole = this._roleList.find(
            (item) => item.nickName === data.nickName
        )
        if (existRole) {
            existRole.score = data.score
        } else {
            this._roleList.push(data)
        }
        this.updateRankList()
    }

    // COLIDER_EVENT
    coliderEvent(data: any) {
        // console.log('coliderEvent', data)
        const existRole = this._roleList.find(
            (item) => item.nickName === data.nickName
        )
        if (existRole) {
            existRole.score = data.score
        } else {
            this._roleList.push(data)
        }
        this.updateRankList()
    }

    timerStart(data: any) {
        // console.log('timerStart', data)
        this.timerLabel.string = data.toString() + 's'
    }

    timerStop(data: any) {
        // console.log('timerStop')
        this.timerLabel.string = '0s'
    }

    timerLabelOn(data: any) {
        this.timerLabel.string = data.toString() + 's'
    }

    // 更新排名列表
    updateRankList() {
        // 排序,找出排名前四的用户和分数
        const sortedList = this._roleList.sort((a, b) => b.score - a.score)
        // 更新排名列表
        // console.log('sortedList', sortedList)
        if (sortedList[0]) {
             this.firstName.string =
            sortedList[0].nickName + '(' + sortedList[0].score + ')'
        }
        if (sortedList[1]) {
            this.secondName.string =
                sortedList[1].nickName + '(' + sortedList[1].score + ')'
        }
        if (sortedList[2]) {
            this.thirdName.string =
                sortedList[2].nickName + '(' + sortedList[2].score + ')'
        }
        if (sortedList[3]) {
            this.fourthName.string =
                sortedList[3].nickName + '(' + sortedList[3].score + ')'
        }
    }

    update(deltaTime: number) {}
}
