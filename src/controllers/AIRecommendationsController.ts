
import { Property } from '../models';
import { PropertyService } from '../services/api';

export class AIRecommendationsController {
  private bestDealsContainer: HTMLElement | null = null;
  private recentlyVerifiedContainer: HTMLElement | null = null;
  private basedOnAreaContainer: HTMLElement | null = null;
  private loading: boolean = true;
  private bestDeals: Property[] = [];
  private recentlyVerified: Property[] = [];
  private basedOnArea: Property[] = [];
  
  constructor() {
    this.initializeTabs();
    this.fetchRecommendations();
  }
  
  private async fetchRecommendations(): Promise<void> {
    try {
      this.loading = true;
      this.updateLoadingState();
      
      // In a real app, these would be separate API calls with actual algorithms
      // For now, we'll simulate them by filtering the mock data differently
      const allProperties = await PropertyService.getProperties();
      
      // Best Deals - properties with good price/value ratio (simulated here with price filters)
      this.bestDeals = allProperties
        .filter(p => p.category === 'buy' && p.price < 5000000)
        .sort((a, b) => a.price - b.price)
        .slice(0, 4);
      
      // Recently Verified - sort by verification date (using postedAt as proxy)
      this.recentlyVerified = allProperties
        .filter(p => p.isVerified)
        .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
        .slice(0, 4);
      
      // Based on your area - properties in a specific area (using Gulshan as example)
      this.basedOnArea = allProperties
        .filter(p => p.location.area === "Gulshan")
        .slice(0, 4);
        
      this.loading = false;
      this.updateLoadingState();
      this.renderProperties();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      this.loading = false;
      this.updateLoadingState();
    }
  }
  
  private initializeTabs(): void {
    // Get tab containers
    this.bestDealsContainer = document.querySelector('.tab-content[data-tab-id="bestDeals"] .properties-grid');
    this.recentlyVerifiedContainer = document.querySelector('.tab-content[data-tab-id="recentlyVerified"] .properties-grid');
    this.basedOnAreaContainer = document.querySelector('.tab-content[data-tab-id="basedOnArea"] .properties-grid');
    
    // Set up tab click handlers
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        // Update active tab trigger
        tabTriggers.forEach(t => {
          t.setAttribute('aria-selected', 'false');
        });
        trigger.setAttribute('aria-selected', 'true');
        
        // Show corresponding tab content
        const tabId = trigger.getAttribute('data-tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabContents.forEach(content => {
          const contentId = content.getAttribute('data-tab-id');
          content.setAttribute('aria-hidden', contentId !== tabId ? 'true' : 'false');
        });
      });
    });
    
    // Set default tab
    if (tabTriggers.length > 0) {
      (tabTriggers[0] as HTMLElement).click();
    }
  }
  
  private updateLoadingState(): void {
    const loadingElements = document.querySelectorAll('.properties-loading');
    const propertiesGrids = document.querySelectorAll('.properties-grid');
    
    if (this.loading) {
      loadingElements.forEach(el => (el as HTMLElement).style.display = 'block');
      propertiesGrids.forEach(el => (el as HTMLElement).style.display = 'none');
    } else {
      loadingElements.forEach(el => (el as HTMLElement).style.display = 'none');
      propertiesGrids.forEach(el => (el as HTMLElement).style.display = 'grid');
    }
  }
  
  private renderProperties(): void {
    if (!this.bestDealsContainer || !this.recentlyVerifiedContainer || !this.basedOnAreaContainer) return;
    
    // Render best deals
    this.bestDealsContainer.innerHTML = '';
    this.bestDeals.forEach((property, index) => {
      const propertyCard = this.createPropertyCard(property, index);
      this.bestDealsContainer?.appendChild(propertyCard);
    });
    
    // Render recently verified
    this.recentlyVerifiedContainer.innerHTML = '';
    this.recentlyVerified.forEach((property, index) => {
      const propertyCard = this.createPropertyCard(property, index);
      this.recentlyVerifiedContainer?.appendChild(propertyCard);
    });
    
    // Render based on area
    this.basedOnAreaContainer.innerHTML = '';
    this.basedOnArea.forEach((property, index) => {
      const propertyCard = this.createPropertyCard(property, index);
      this.basedOnAreaContainer?.appendChild(propertyCard);
    });
  }
  
  private createPropertyCard(property: Property, index: number): HTMLElement {
    // Fetch property card template
    const template = document.querySelector('#property-card-template') as HTMLTemplateElement;
    const cardFragment = template.content.cloneNode(true) as DocumentFragment;
    const cardElement = cardFragment.querySelector('.property-card') as HTMLElement;
    
    // Add animation delay
    cardElement.classList.add('animate-fade-in');
    cardElement.style.animationDelay = `${index * 0.1}s`;
    
    // Set property data
    const imageElement = cardElement.querySelector('.property-image') as HTMLImageElement;
    imageElement.src = property.images[0];
    imageElement.alt = property.title;
    
    const titleElement = cardElement.querySelector('.property-title') as HTMLElement;
    titleElement.textContent = property.title;
    
    const locationElement = cardElement.querySelector('.location-text') as HTMLElement;
    locationElement.textContent = `${property.location.area}, ${property.location.city}`;
    
    const priceElement = cardElement.querySelector('.property-price') as HTMLElement;
    priceElement.textContent = `৳${property.price.toLocaleString()}`;
    
    const bedsElement = cardElement.querySelector('.property-beds') as HTMLElement;
    bedsElement.textContent = `${property.beds} beds`;
    
    const bathsElement = cardElement.querySelector('.property-baths') as HTMLElement;
    bathsElement.textContent = `${property.baths} baths`;
    
    const sizeElement = cardElement.querySelector('.property-size') as HTMLElement;
    sizeElement.textContent = `${property.size} sqft`;
    
    // Set badge visibility
    const verifiedBadge = cardElement.querySelector('[data-verified]') as HTMLElement;
    if (verifiedBadge) {
      verifiedBadge.setAttribute('data-verified', property.isVerified.toString());
    }
    
    const premiumBadge = cardElement.querySelector('[data-premium]') as HTMLElement;
    if (premiumBadge) {
      premiumBadge.setAttribute('data-premium', property.isPremium ? 'true' : 'false');
    }
    
    return cardElement;
  }
  
  public static init(): void {
    // Create template for property card
    const templateString = document.getElementById('property-card-template-source')?.innerHTML;
    if (!templateString) {
      console.error('Property card template not found');
      return;
    }
    
    const template = document.createElement('template');
    template.id = 'property-card-template';
    template.innerHTML = templateString;
    document.body.appendChild(template);
    
    // Initialize the controller
    new AIRecommendationsController();
  }
}

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  AIRecommendationsController.init();
});
