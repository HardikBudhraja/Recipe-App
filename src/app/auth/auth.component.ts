import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = "";
    private closeSub: Subscription;
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

    constructor(private router: Router,
        private authService: AuthService,
        private componentFactoryResolver: ComponentFactoryResolver){}
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        //console.log(form.value);
        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;
        this.isLoading = true;

        if(this.isLoginMode){
            authObservable = this.authService.login(email, password);
        }
        else{
            authObservable = this.authService.signup(email, password)
        }

        authObservable.subscribe(
            response => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(["/recipes"]);
            },
            error => {
                console.log(error);
                this.error = error;
                this.showErrorMessage(error);
                this.isLoading = false;
            }
        );
        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    private showErrorMessage(errorMessage: string){
        //Not acceptable by angular :- [const alert = new AlertComponent();]
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            hostViewContainerRef.clear();
        });

    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}