import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-super-admin',
  templateUrl:'./super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  admins: any[] = [];
  pendingPosts: any[] = [];
  selectedAdminForPremium: any = null;
  premiumPrice: number = 0;
  selectedTab: 'admin' | 'post' = 'admin'; // To toggle between Admin and Post Management
  errorMessage: string = ''; // To display errors if any
  loading: boolean = false; // To indicate if the request is loading
  http: any;


  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadPendingPosts();
  }

  loadAdmins(): void {
    this.superAdminService.getAllAdmins().subscribe((admins) => {
      console.log("Admin list after disable action:", admins);
      this.admins = admins;
    });
  }


  approveAdmin(adminId: number): void {
    console.log(adminId,"AdminId in Approve state");
    this.superAdminService.approveAdmin(adminId).subscribe(() =>{
      this.admins = this.admins.map(admin => {
        if (admin.id === adminId) {
          return { ...admin, status: 'Approved' };
        }
        return admin;
      });
    });
  }

  disableAdmin(adminId: number): void {
    console.log(adminId, "AdminId in Disable state");
    this.superAdminService.disableAdmin(adminId).subscribe(
      () => this.loadAdmins(),
      (error) => {
        console.error('Error disabling admin:', error);
        // Optionally, display an error message to the user
      }
    );
  }

  loadPendingPosts(): void {
    this.superAdminService.getAllPendingPosts().subscribe((posts) => {
      this.pendingPosts = posts;
      console.log("Pending Posts:", this.pendingPosts);
    });
  }

  approvePost(postId: number, isApproved: boolean): void {
    this.superAdminService.approvePost(postId, isApproved).subscribe(() => {
      this.loadPendingPosts();
    });
  }

  disapprovePost(postId: number): void {
    this.superAdminService.disapprovePost(postId).subscribe(() => {
      this.loadPendingPosts();
    });
  }

  // setPremiumPrice(admin: any): void {
  //   this.selectedAdminForPremium = admin;
  //   this.premiumPrice = admin.premiumPrice || 0;
  // }

  // savePremiumPrice(): void {
  //   if (this.selectedAdminForPremium) {
  //     this.superAdminService.setPremiumPrice(this.selectedAdminForPremium.id, this.premiumPrice).subscribe(() => {
  //       this.loadAdmins();
  //       this.selectedAdminForPremium = null;
  //       this.premiumPrice = 0;
  //     });
  //   }
  // }
}
