// internship.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { InternshipService } from 'src/app/service/service-internship.service';


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internshipForm!: FormGroup;
  internships: any[] = [];
  selectedInternship: any = null;
  adminId = 1; // Example admin ID; dynamically adjust this

  constructor(private fb: FormBuilder, private internshipService: InternshipService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.internshipForm = this.fb.group({
      id:[''],
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      duration: [''],
      stipend: [''],
      qualifications: ['', Validators.required],
      skills: [''],
      description: [''],
      status: ['', Validators.required],
      openingStartDate: [''],
      lastApplyDate: [''],
      numberOfOpenings: [null],
      perks: [''],
      companyDescription: [''],
    });
    this.fetchInternships();
  }

  fetchInternships(): void {
    this.internshipService.getAllInternships().subscribe((data) => {
      this.internships = data;
    });
  }

  createInternship(): void {
    if (this.internshipForm.valid) {
      const internshipData = this.internshipForm.value;
      this.adminService.postInternship(this.adminId, internshipData).subscribe(() => {
        this.fetchInternships();
        this.resetForm();
      });
    }
  }

  selectInternship(internship: any): void {
    this.selectedInternship = internship;
    this.internshipForm.patchValue(internship);
  }

  updateInternship(): void {
    if (this.selectedInternship && this.internshipForm.valid) {
      this.internshipService.updateInternship(this.selectedInternship.id, this.internshipForm.value).subscribe(() => {
        this.fetchInternships();
        this.internshipForm.reset();
        this.selectedInternship = null;
      });
    }
  }

  deleteInternship(id: number): void {
    this.internshipService.deleteInternship(id).subscribe(() => {
      this.fetchInternships();
    });
    this.fetchInternships();
  }

  resetForm(): void {
    this.internshipForm.reset();
    this.selectedInternship = null;
  }
}
