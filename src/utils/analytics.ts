// frontend/src/utils/analytics.ts
interface FormAnalyticsEvent {
    formId: string;
    eventType: 'start' | 'submit' | 'error' | 'success';
    errorMessage?: string;
    timeSpent?: number;
  }
  
  class Analytics {
    private formStartTimes: Record<string, number> = {};
  
    trackFormStart(formId: string) {
      this.formStartTimes[formId] = Date.now();
      this.trackEvent({
        formId,
        eventType: 'start'
      });
    }
  
    trackFormSubmit(formId: string) {
      const timeSpent = this.getTimeSpent(formId);
      this.trackEvent({
        formId,
        eventType: 'submit',
        timeSpent
      });
    }
  
    trackFormError(formId: string, errorMessage: string) {
      const timeSpent = this.getTimeSpent(formId);
      this.trackEvent({
        formId,
        eventType: 'error',
        errorMessage,
        timeSpent
      });
    }
  
    trackFormSuccess(formId: string) {
      const timeSpent = this.getTimeSpent(formId);
      this.trackEvent({
        formId,
        eventType: 'success',
        timeSpent
      });
      delete this.formStartTimes[formId];
    }
  
    private getTimeSpent(formId: string): number {
      const startTime = this.formStartTimes[formId];
      if (!startTime) return 0;
      return Date.now() - startTime;
    }
  
    private trackEvent(event: FormAnalyticsEvent) {
      // In a real application, you would send this to your analytics service
      // For now, we'll just log it to console
      console.log('Form Analytics Event:', event);
    }
  }
  
  export const analytics = new Analytics();