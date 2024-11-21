import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { ApiService } from 'src/app/shared/services/api/api.service';
import { IonicModule } from '@ionic/angular';
/* import { IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonButton, IonHeader } from '@ionic/angular/standalone'; */
import { Router } from '@angular/router';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-booking-two',
  templateUrl: './booking-two.page.html',
  styleUrls: ['./booking-two.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HeaderMainComponent]
  /* imports: [IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonButton, IonHeader, ReactiveFormsModule, CommonModule, HeaderMainComponent] */
})
export class BookingTwoPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public glbService: GlbService,
    public apiService: ApiService
  ) {
    this.form = this.formBuilder.group({});
    this.glbService.passengersData.length == 0 ? this.router.navigate(['/']) : false;
    console.log('glbService passengers', this.glbService.passengersData);
    console.log('glbService flight', this.glbService.flightSelected);
    for (let i = 0; i < this.glbService.flightSelected.pax.length; i++) {
      for (let j = 0; j < this.glbService.flightSelected.pax[i].ref.length; j++) {
        console.log(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}`);
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-documentType`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-num_id`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-gender`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-nationality`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-dateOfBirth`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-name`, this.formBuilder.control('', Validators.required));
        this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-surname`, this.formBuilder.control('', Validators.required));
        if (i == 0 && j == 0) {
          this.form.addControl(`data-contact-email`, this.formBuilder.control('', [Validators.required, Validators.email]));
          this.form.addControl(`data-contact-phone`, this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
        }
        /* if (this.glbService.iataToName(this.glbService.flightSelected.ida[0].iataFrom) != 'Colombia' || this.glbService.iataToName(this.glbService.flightSelected.vuelta[0].iataFrom).country != 'Colombia') {
          this.form.addControl(`${this.glbService.flightSelected.pax[i].ptc}-${j + 1}-passport`, this.formBuilder.control('', Validators.required));
        } */
      }
    }
  }

  ngOnInit() { }

  addField(fieldName: string, validators: any[] = []) {
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado', this.form.value);
      this.buildBody(this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(field => { const control = this.form.get(field); control?.markAsTouched({ onlySelf: true }); });
      let invalidFields: any = [];
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key); if (control && !control.valid) { invalidFields.push(key); }
      });
      /* console.log('Campos inválidos:', invalidFields.join(', ')); */
    }
  }

  async buildBody(data: any) {
    const travellerInfoTemp: any = this.agruparDatos(data);
    /* let travellerInfo: any = [], inf: any = [], dataElementsIndiv:any = []; */
    console.log('agrupados: ', travellerInfoTemp);
    travellerInfoTemp.airline = this.glbService.flightSelected.vc;
    travellerInfoTemp.itinerary = { from: this.glbService.iataToName(this.glbService.flightSelected.ida[0].iataFrom).city, to: this.glbService.iataToName(this.glbService.flightSelected.ida[0].iataTo).city, oneWay: this.glbService.trips }
    travellerInfoTemp.airline
    console.log('glbService.session: ', this.glbService.session);
    const PNR_AddMultiElements: any = await this.apiService.post('/travel/add_multi_elements', { data: travellerInfoTemp, session: this.glbService.session });
    console.log('PNR_AddMultiElements: ', PNR_AddMultiElements);
    /* for (let a = 0; a < travellerInfoTemp.length; a++) {
      if (travellerInfoTemp[a].type != 'INF') {
  buildBody(data: any) {
    const travellerInfoTemp: any[] = this.agruparDatos(data);
    let travellerInfo: any[] = [];
    let dataElementsIndiv: any[] = [];
    let otCounter = 1;
  
    console.log('agrupados: ', travellerInfoTemp);
  
    travellerInfoTemp.forEach((traveller: any, index: number) => {
      const isInfant = traveller.type === 'INF';
      const parentIndex = isInfant ? index - 1 : index;
      const travellerNumber = parentIndex + 1;
  
      if (!isInfant) {
        travellerInfo.push({
          elementManagementPassenger: [{
            reference: [{ qualifier: ["PR"], number: [travellerNumber.toString()] }],
            segmentName: ["NM"]
          }],
          passengerData: [{
            travellerInformation: [{
              traveller: [{ 
                surname: [traveller.surname],
                quantity: ["1"]
              }],
              passenger: [{
                firstName: [traveller.name],
                type: [traveller.type]
              }]
            }],
            dateOfBirth: [{
              dateAndTimeDetails: [{
                date: [this.convertToDate(traveller.birthday)]
              }]
            }]
          }]
        });
  
        // Add contact information for the first adult passenger
        if (index === 0) {
          dataElementsIndiv.push(
            {
              elementManagementData: [{ 
                reference: [{ qualifier: ["OT"], number: [otCounter++] }], 
                segmentName: ["AP"] 
              }],
              freetextData: [{ 
                freetextDetail: [{ subjectQualifier: ["3"], type: ["6"] }], 
                longFreetext: [traveller.phone] 
              }]
            },
            {
              elementManagementData: [{ 
                reference: [{ qualifier: ["OT"], number: [otCounter++] }], 
                segmentName: ["AP"] 
              }],
              freetextData: [{ 
                freetextDetail: [{ subjectQualifier: ["3"], type: ["P02"] }], 
                longFreetext: [traveller.email] 
              }]
            }
          );
        }
  
        // Add FOID and DOCS for each passenger
        dataElementsIndiv.push(
          {
            elementManagementData: [{ 
              reference: [{ qualifier: ["OT"], number: [otCounter++] }], 
              segmentName: ["SSR"] 
            }],
            serviceRequest: [{ 
              ssr: [{ 
                type: ["FOID"], 
                status: ["HK"], 
                quantity: ["1"], 
                companyId: ["AM"], 
                freetext: [`NI${traveller.num_id}`] 
              }] 
            }],
            referenceForDataElement: [{ 
              reference: [{ qualifier: ["PR"], number: [travellerNumber.toString()] }] 
            }]
          },
          {
            elementManagementData: [{ 
              reference: [{ qualifier: ["OT"], number: [otCounter++] }], 
              segmentName: ["SSR"] 
            }],
            serviceRequest: [{ 
              ssr: [{ 
                type: ["DOCS"], 
                status: ["HK"], 
                quantity: ["1"], 
                companyId: ["YY"], 
                freetext: [`P-COL-${traveller.num_id}-COL-${this.convertToDate(traveller.birthday)}-${traveller.type === 'ADT' ? 'M' : 'F'}-28SEP28-${traveller.surname}-${traveller.name}`] 
              }] 
            }],
            referenceForDataElement: [{ 
              reference: [{ qualifier: ["PR"], number: [travellerNumber.toString()] }] 
            }]
          }
        );
      } else {
        // Add infant to the parent's passengerData
        if (travellerInfo[parentIndex]) {
          travellerInfo[parentIndex].passengerData.push({
            travellerInformation: [{
              traveller: [{ surname: [traveller.surname] }],
              passenger: [{ firstName: [traveller.name], type: [traveller.type] }]
            }],
            dateOfBirth: [{
              dateAndTimeDetails: [{ date: [this.convertToDate(traveller.birthday)] }]
            }]
          });
          travellerInfo[parentIndex].passengerData[0].travellerInformation[0].passenger[0].infantIndicator = ['3'];
          travellerInfo[parentIndex].passengerData[0].travellerInformation[0].traveller[0].quantity[0] = '2';
  
          // Add DOCS for infant
          dataElementsIndiv.push({
            elementManagementData: [{ 
              reference: [{ qualifier: ["OT"], number: [otCounter++] }], 
              segmentName: ["SSR"] 
            }],
            serviceRequest: [{ 
              ssr: [{ 
                type: ["DOCS"], 
                status: ["HK"], 
                quantity: ["1"], 
                companyId: ["YY"], 
                freetext: [`P-COL-${traveller.num_id}-COL-${this.convertToDate(traveller.birthday)}-FI-28SEP28-${traveller.surname}-${traveller.name}`] 
              }] 
            }],
            referenceForDataElement: [{ 
              reference: [{ qualifier: ["PR"], number: [travellerNumber.toString()] }] 
            }]
          });
        }
      }
    });
    console.log('travellerInfo: ', travellerInfo);
    console.log('inf: ', inf); */
  
    /* const result = {
      "soap:Body": {
        PNR_AddMultiElements: [{
          pnrActions: [{ optionCode: ["0"] }],
          travellerInfo: travellerInfo,
          dataElementsMaster: [{
            marker1: [""],
            dataElementsIndiv: dataElementsIndiv
          }]
        }]
      }
    }; */
  
    /* console.log('PNR_AddMultiElements result:', result);
    return result; */
  }

  agruparDatos(input: any) {
    let result: any = {}, idCounter = 1;
    Object.entries(input).forEach(([key, value]) => {
      const match = key.match(/(ADT|CNN|INF)-(\d+)-(.+)/);
      if (match) {
        const [, type, number, attribute] = match, identifier = `${type}-${number}`;
        if (!result[identifier]) { result[identifier] = { id: idCounter, type, number: parseInt(number, 10) }; idCounter++; }
        result[identifier][attribute] = value;
      }
    });
    return { passengers: Object.values(result), contact: { phone: input['data-contact-phone'], email: input['data-contact-email'] } };
    /* return result; */
  }

  onDateChange(event: any, controlName: string) {
    this.form.get(controlName)?.setValue((event.detail.value).split('T')[0]);
    /* this.closeModal(); */
  }

  body = {
    "soap:Body": {
      PNR_AddMultiElements: [{
        pnrActions: [{ optionCode: ["0"] }],
        travellerInfo: [{
          elementManagementPassenger: [{ reference: [{ qualifier: ["PR"], number: ["1"] }], segmentName: ["NM"] }],
          passengerData: [
            {
              travellerInformation: [{ traveller: [{ surname: ["BARBO"], quantity: ["2"] }], passenger: [{ firstName: ["BRUNO"], type: ["ADT"], infantIndicator: ["3"] }] }],
              dateOfBirth: [{ dateAndTimeDetails: [{ date: ["04JAN84"] }] }]
            },
            {
              travellerInformation: [{ traveller: [{ surname: ["ALCEDO"] }], passenger: [{ firstName: ["ANGELES"], type: ["INF"] }] }],
              dateOfBirth: [{ dateAndTimeDetails: [{ date: ["29NOV22"] }] }]
            }
          ]
        },
        {
          elementManagementPassenger: [{ reference: [{ qualifier: ["PR"], number: ["2"] }], segmentName: ["NM"] }],
          passengerData: [{
            travellerInformation: [{ traveller: [{ surname: ["RAMIRE"], quantity: ["1"] }], passenger: [{ firstName: ["CALIXTO"], type: ["CNN"] }] }],
            dateOfBirth: [{ dateAndTimeDetails: [{ date: ["07JUL16"] }] }]
          }]
        }],
        dataElementsMaster: [{
          marker1: [""],
          dataElementsIndiv: [{
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["1"] }], segmentName: ["AP"] }],
            freetextData: [{ freetextDetail: [{ subjectQualifier: ["3"], type: ["6"] }], longFreetext: ["5769420 + ()"] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["2"] }], segmentName: ["AP"] }],
            freetextData: [{ freetextDetail: [{ subjectQualifier: ["3"], type: ["P02"] }], longFreetext: ["BRUNO_1AWS_TEST@TAYRONA.LATAM.CO"] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["3"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["FOID"], status: ["HK"], quantity: ["1"], companyId: ["AM"], freetext: ["NI19393920"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["4"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-19393920-COL-04JAN84-F-28SEP28-BARBO-BRUNO"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["5"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-44444400-COL-29NOV22-FI-28SEP28-ALCEDO-ANGELES"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["6"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["FOID"], status: ["HK"], quantity: ["1"], companyId: ["AM"], freetext: ["NI29898960"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["2"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["7"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-29898960-COL-07JUL16-M-28SEP28-RAMIRE-CALIXTO"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["2"] }] }]
          }]
        }]
      }]
    }
  }

  convertToDate(dateString: any) {
    let date = new Date(), day = dateString.substring(0, 2), month = dateString.substring(2, 4) - 1, year = dateString.substring(4, 6);
    date.setDate(day), date.setMonth(month), date.setFullYear(2000 + parseInt(year));
    return date;
  }

  /* elementManagementData>reference>qualifier:
  001 Customer identification number
  002 Corporate identification number
  D Dominant segment in a marriage
  N Non dominant segment in a marriage
  OT Other element tatoo reference number
  PR Passenger Client-request-message-defined ref. nbr
  PT Passenger tatoo reference number
  SR Segment Client-request-message-defined ref. nbr
  SS Segment Tatoo+SubTatoo reference number
  ST Segment Tatoo reference number */

  /* elementManagementData>reference>segmentName:
  AB Billing Address element
  ABU Unstructured Billing Address element
  AI Accounting Information element
  AIR Air segment
  AM Mailing address element
  AMU Unstructured Mailing Address Element
  AP Contact element
  AU ATX - Non-automated Air Taxi auxiliary segment
  CU Non-automated Car auxiliary segment
  ES Individual PNR Security element
  FD Fare Discount element
  FE Endorsements / Restrictions element
  FF Frequent Flyer entry
  FH Manual Document Registration element
  FHA Automated ticket number
  FHE Electronic ticket number
  FHM Manual ticket number/document registration element
  FK AIR destination
  FM Commission element
  FO Original Issue / Issue in Exchange For element
  FP Form of Payment element
  FS Miscellaneous Ticketing Information element
  FT Tour Code element
  FV Ticketing Carrier Designator element
  FY Fare print override element
  FZ Miscellaneous Information element
  HU Non-automated Hotel auxiliary segment
  NG Group Name element
  NM Name element
  NZ Non Commerciak PNR Name element
  OP Option element
  OS Other Special Information element
  RC Confidential Remark element
  RF Receive From element
  RI Invoice remark
  RM General Remark elementt
  RQ Quality control remark element
  RU Non-automated Miscellaneous auxiliary segment
  RX Corporate Remark
  SK Special Keyword elements
  SSR SSR element
  STR Seat Request
  TK Ticket element
  TU Non-automated Tour auxiliary segment */

  /* dataElementsMaster>freetextData>freetextDetail>type
  10 Endorsement information
  11 Commission information
  12 Tour number
  16 Form of payment information
  17 Ticketing information
  2 Address (home or hotel)
  28 Other service information (OSI)
  3 Business phone
  4 Home phone number
  45 Original issue information
  5 Telephone nature not known
  6 Travel agent telephone number
  60 Manual Priority Line
  7 Mobile Phone Number
  N Notification element
  P01 Fax number
  P02 E-mail address
  P03 Intenet address
  P04 Fare discount
  P05 Fare print override
  P06 Automated ticket
  P07 AIR sequence number
  P08 Mailing address
  P09 Address verification
  P10 AK-train pending information
  P11 Temporary TAG line of the PNR header
  P12 TAG line of the PNR header
  P13 Retrieve options of the PNR header
  P14 Shadow AIR sequence number
  P15 Manual document
  P16 Automated invoice number
  P17 Control number
  P18 Ticketing carrier
  P19 Miscellaneous information
  P20 Accounting information
  P21 Option information
  P22 Receive from
  P23 Shadow destination
  P24 Home address for mailing address
  P25 Delivery address for mailing address
  P26 For tour operator name
  P27 For OS element
  P28 For other special information element
  P30 For ship name - Cruise distribution data
   */

  /* serviceRequest>ssr>status
  HK Holds confirmed
  HN Have requested
  KK Confirming
  NN Need. Reply required indicating action taken using appropriate code
  SS Sold */




  /* AB Billing Address element
  ABU Unstructured Billing Address element
  AI Accounting Information element
  AIR Air segment
  AM Mailing address element
  AMU Unstructured Mailing Address Element
  AP Contact element
  AU ATX - Non-automated Air Taxi auxiliary segment
  CU Non-automated Car auxiliary segment
  ES Individual PNR Security element
  FD Fare Discount element
  FE Endorsements / Restrictions element
  FF Frequent Flyer entry
  FH Manual Document Registration element
  FHA Automated ticket number
  FHE Electronic ticket number
  FHM Manual ticket number/document registration element
  FK AIR destination
  FM Commission element
  FO Original Issue / Issue in Exchange For element
  FP Form of Payment element
  FS Miscellaneous Ticketing Information element
  FT Tour Code element
  FV Ticketing Carrier Designator element
  FY Fare print override element
  FZ Miscellaneous Information element
  HU Non-automated Hotel auxiliary segment
  NG Group Name element
  NM Name element
  NZ Non Commerciak PNR Name element
  OP Option element
  OS Other Special Information element
  RC Confidential Remark element
  RF Receive From element
  RI Invoice remark
  RM General Remark elementt
  RQ Quality control remark element
  RU Non-automated Miscellaneous auxiliary segment
  RX Corporate Remark
  SK Special Keyword elements
  SSR SSR element
  STR Seat Request
  TK Ticket element
  TU Non-automated Tour auxiliary segment */

  /* Qualifier: 001 Customer identification number
  002 Corporate identification number
  D Dominant segment in a marriage
  N Non dominant segment in a marriage
  OT Other element tatoo reference number
  PR Passenger Client-request-message-defined ref. nbr
  PT Passenger tatoo reference number
  SR Segment Client-request-message-defined ref. nbr
  SS Segment Tatoo+SubTatoo reference number
  ST Segment Tatoo reference number */


}
