import {UI, Panel, TabArea} from "UI";
import {Dispatcher} from "Dispatcher";
import {Route, Router} from "Router";

console.log("Got here!");

class MyElement extends UI.Element {
    render() {
        return [
            <h1>Hey!</h1>,
            <TabArea>
                <Panel title="tab1">
                    Salut!
                </Panel>
                <Panel title="tab2">
                    Salut2!
                </Panel>
            </TabArea>
        ]
    }
}

MyElement.create(document.body);