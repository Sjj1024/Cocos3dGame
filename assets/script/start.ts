import { _decorator, Component, director, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('start')
export class start extends Component {
    start() {}

    update(deltaTime: number) {}

    begin() {
        console.log('begin')
        director.loadScene('main')
    }
}
