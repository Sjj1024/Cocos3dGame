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
        EventListener.on(EventName.FIRST_NAME, this.firstNameOn, this)
        EventListener.on(EventName.SECOND_NAME, this.secondNameOn, this)
        EventListener.on(EventName.THIRD_NAME, this.thirdNameOn, this)
        EventListener.on(EventName.FOURTH_NAME, this.fourthNameOn, this)
        EventListener.on(EventName.TIMER_LABEL, this.timerLabelOn, this)
    }

    firstNameOn(data: any) {
        console.log('firstName', name)
    }

    secondNameOn(data: any) {
        console.log('secondName', data)
    }

    thirdNameOn(data: any) {
        console.log('thirdName', data)
    }

    fourthNameOn(data: any) {
        console.log('fourthName', data)
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
