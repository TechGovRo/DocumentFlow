import {UI} from "UI";
import {NavManager} from "navmanager/NavManager";
import {NavElement, NavLinkElement} from "navmanager/NavElement";
import {initializeSwipeEvents} from "navmanager/NavSwipeDetection";

export class DocumentFlowNavManager extends NavManager {
    // getRightFixed() {
    //     return [
    //         <NavElement value="Introdu nou">
    //             <NavLinkElement value="Document" href="/new_entry/" />
    //             <NavLinkElement value="Articol" href="/new_article" />
    //         </NavElement>
    //     ]
    // }

    onMount() {
        super.onMount();
        initializeSwipeEvents(this);
        NavManager.Global = this;
    }
}
