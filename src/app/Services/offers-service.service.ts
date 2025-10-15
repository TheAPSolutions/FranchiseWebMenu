import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateOffer } from '../models/offers/update_offer.model';
import { Offer } from '../models/offers/offer_model';
import { catchError, Observable, throwError } from 'rxjs';
import { UpdateOfferImage } from '../models/offers/update_offer_image.model';
import { PagedResponse } from '../models/add-menuItem-request/paged-response.model';
import { AddOffer } from '../models/offers/add_offer.model';
import { getPagedOffers } from '../models/Offers Models/offers-paged-response.model';
import { Offers } from '../models/Offers Models/offers.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OffersServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/Offer';
  //apiUrl = 'https://localhost:7142/api/Offer';

  getAllOfferspaged(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<getPagedOffers> {
    return this.http
      .get<getPagedOffers>(
        `${this.apiUrl}/Offer/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError));
  }

  getAllOffers(): Observable<Offers[]> {
    return this.http
      .get<Offers[]>(`${this.apiUrl}/Offer`)
      .pipe(catchError(this.handleError));
  }

  addOffer(offer: AddOffer): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create FormData and append each field from the model
    const formData = new FormData();
    formData.append('descriptionTr', offer.descriptionTr);
    formData.append('descriptionEn', offer.descriptionEn);
    formData.append('descriptionAr', offer.descriptionAr);

    // Append the file (if exists)
    if (offer.imageUrl) {
      formData.append('imageUrl', offer.imageUrl, offer.imageUrl.name);
    }
    // Send the form data
    return this.http
      .post(`${this.apiUrl}/Offer?addAuth=true`, formData)
      .pipe(catchError(this.handleError));
  }

  UpdateOffer(id: number, updatedOffer: UpdateOffer): Observable<Offer> {
    return this.http.put<Offer>(
      `${this.apiUrl}/Offer/${id}?addAuth=true`,
      updatedOffer
    );
  }

  updateOfferImage(model: UpdateOfferImage): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    if (model.image) {
      formData.append('image', model.image, model.image.name);
    }
    return this.http
      .put(`${this.apiUrl}/Offer/image?addAuth=true`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteOffer(id: number): Observable<Offer> {
    return this.http
      .delete<Offer>(`${this.apiUrl}/Offer/${id}?addAuth=true`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.status === 400) {
      // Capture the error message returned by the ASP.NET controller
      errorMessage = error.error; // This will be the string message from BadRequest
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    //console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
