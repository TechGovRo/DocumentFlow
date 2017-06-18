import {UI, Panel, TabArea, ViewportMeta} from "UI";
import {Dispatcher} from "Dispatcher";
import {Route, Router} from "Router";
import {DocumentFlowNavManager} from "./DocumentFlowNavManager";

class DocumentFlowFrontPage extends UI.Element {
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

class AboutPage extends UI.Element {
    render() {
        return [
            <h1>About...</h1>
        ]
    }
}

class NewEntryPage extends UI.Element {
    render() {
        return [
            <h1>Adauga intrare noua!</h1>,
        ]
    }
}

class DocumentFlowApp extends UI.Element {
    render() {
        return [
            <DocumentFlowNavManager ref="navManager"/>,
            <div style={{height: "50px"}}> </div>, // TODO: It should all work without this!
            <Router routes={ROUTES} ref="router"/>
        ];
    }

    redraw() {
        super.redraw();
        Router.Global = this.children[2];
    }

    onMount() {
        Dispatcher.Global.addListener("externalURLChange", () => {
            if (this.navManager.leftSidePanel.visible) {
                this.navManager.toggleLeftSidePanel();
            }
        });
        this.router.addListener("change", () => {
            document.body.click();
            Dispatcher.Global.dispatch("closeAllModals");
        });
        Dispatcher.Global.dispatch("initNavManagerDone");
        window.onpopstate = () => {
            Dispatcher.Global.dispatch("externalURLChange");
        };
    }
}

const ROUTES = [
    new Route("", DocumentFlowFrontPage),
    new Route("new_entry", NewEntryPage),
    new Route("about", AboutPage),
];

export const viewportMeta = ViewportMeta.create(document.head, {minDeviceWidth: 360});
export const app = DocumentFlowApp.create(document.body);
