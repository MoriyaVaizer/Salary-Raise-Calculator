import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(HotToastService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'קרתה שגיאה בלתי צפויה';
            if (error.status === 400) {
                errorMessage = 'בקשה שגויה, אנא בדוק את הנתונים שהזנת';
            } else if (error.status === 404) {
                errorMessage = 'המשאב המבוקש לא נמצא';
            } else if (error.status === 500) {
                errorMessage = 'שגיאת שרת פנימית, נסו שוב מאוחר יותר';
            } else if (error.error?.message) {
                errorMessage = error.error.message;
            }

            // הקפצת ההודעה המעוצבת
            toast.error(errorMessage, {
                position: 'bottom-center',
                style: {
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#d32f2f',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px',
                        borderRight: '5px solid #d32f2f',
                        direction: 'rtl',
                        fontSize: '16px',
                        fontWeight: '500',
                    },
                    iconTheme: {
                        primary: '#d32f2f',
                        secondary: '#fff',
                    },
                },
            });

            return throwError(() => error);
        })
    );
};