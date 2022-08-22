import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

 import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UserModelDTO } from 'src/app/core/dtos/user-model-dto';
import { GroupData } from 'src/app/features/group/dto/group-data';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {


    pages= [

        {
            title:"Dashboard",
            url:"/dashboard",
            icon:"analytics-outline",
            open:false,
            children:[]
        },
        {
            title:"Project",
            url:"/project",
            icon:"business",
            open:false,
            children:[]
        },
        {
            title:"Project-floors",
            url:"/project-floor",
            icon:"layers",
            open:false,
            children:[]
        },
        {
            title:"items",
            url:"/item",
            icon:"pricetags-outline",
            open:false,
            children:[]
        },
        {
            title:"Damaged items",
            url:"/damaged-item",
            icon:"bookmarks-outline",
            
            children:[]
        },
        {
            title:"Setups",
            icon:"cog",
            open:false,
            children:[
                {
                    title:"Organizations",
                    url:"/organizations",
                    icon:"briefcase-outline",
                    open:false
                },
                {
                    title:"Users",
                    url:"/users",
                    icon:"people-outline"
                },
                {
                    title:"Groups",
                    url:"/groups",
                    icon:"people-circle-outline"
                },
                {
                    title:"Item types",
                    url:"/item-types",
                    icon:"prism-outline"
                },
                {
                    title:"Item categories",
                    url:"/item-categories",
                    icon:"construct-outline"
                },
                {
                    title:"Project categories",
                    url:"/project-categories",
                    icon:"construct-outline"
                },
                {
                    title:"Project statuses",
                    url:"/project-status",
                    icon:"stopwatch-outline"
                },
                {
                    title:"Usage statuses",
                    url:"/usage-status",
                    icon:"home-outline"
                },
                {
                    title:"Unit types",
                    url:"/unit-type",
                    icon:"contract-outline"
                },
                {
                    title:"User types",
                    url:"/user-type",
                    icon:"people-outline"
                },
                {
                    title:"Roles",
                    url:"/roles",
                    icon:"finger-print-outline"
                }
            ],
        },
            {
                title:"About",
                url:"",
                icon:"",
                children:[]
            }
        

    ];


    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = true;
    userName: string ;
    isAdmin: boolean = false;
    userModel:UserModelDTO;
    userGroup:GroupData;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.authService.currentUser.subscribe(data=>{
            if( data?.['content']!==undefined){
               
            const jwtDecoded: {}  = JSON.parse(atob(data?.content['token'].split(".")[1]));
            this.userModel=new UserModelDTO(jwtDecoded);
            }
          }) 
    }

    ngOnInit(): void {
        this.userName= this.userModel.userName;
       this.userModel.userGroups.filter(x=>{
            if(x.name.includes("dmin")){
                this.isAdmin=true;
            }
        });
       

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
         this.autoLogoutSubscription = timer$.subscribe(() => {
             this.authGuard.canActivate();
         });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }


}
