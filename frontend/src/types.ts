export interface HeroContent {
  id: number;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImageUrl?: string;
}

export interface HeroContentResponse {
  id: number;
  headline: string;
  subheadline?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  backgroundImageUrl?: string | null;
}

export interface UpdateHeroDto {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImageUrl?: string;
}