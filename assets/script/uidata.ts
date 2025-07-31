import { _decorator, Component, Label, Node } from 'cc'
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

    start() {
        console.log('uidata start')
        EventListener.on(EventName.TIMER_START, this.timerStart, this)
        EventListener.on(EventName.TIMER_STOP, this.timerStop, this)
        EventListener.on(EventName.TIMER_LABEL, this.timerLabelOn, this)
    }

    timerStart(data: any) {
        console.log('timerStart', data)
        this.timerLabel.string = data.toString() + 's'
    }

    timerStop(data: any) {
        console.log('timerStop')
        this.timerLabel.string = '0s'
    }

    timerLabelOn(data: any) {
        console.log('timerLabel', data)
        this.timerLabel.string = data.toString() + 's'
    }

    update(deltaTime: number) {}
}
