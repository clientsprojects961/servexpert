/**
 * @typedef {'website' | 'website+ads'} ProjectType
 * 
 * @typedef {Object} ProjectStats
 * @property {string} revenue
 * @property {string} roas
 * @property {string} impressions
 * @property {string} ctr
 * @property {string} conversions
 * @property {string} campaigns
 * 
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} name
 * @property {string[]} tags
 * @property {string} description
 * @property {string} liveUrl
 * @property {ProjectType} type
 * @property {string[]} services
 * @property {ProjectStats | null} stats
 * @property {string} thumbnail
 * @property {string} year
 * @property {string} color
 */

/** @type {Project[]} */
export const projects = [

  {
    slug: 'mystic-spa',
    name: 'Mystic Spa',
    tags: ['local business', 'meta ads', 'lead gen'],
    description: 'Ran targeted Meta Ads campaigns for a local spa business. Successfully generated 250+ quality leads through strategic audience segmentation and compelling ad creatives.',
    liveUrl: 'https://www.mysticspa.in',
    type: 'website+ads',
    services: ['Meta Ads', 'Lead Generation', 'Audience Segmentation', 'Ad Creatives'],
    stats: {
      revenue: '—',
      roas: '—',
      impressions: '850K+',
      ctr: '4.5%',
      conversions: '250+ Leads',
      campaigns: '3',
    },
    thumbnail: '/mysticspa.png',
    year: '2025',
    color: '#FEC700',
  },
  {
    slug: 'formula-188cm',
    name: 'Formula188cm',
    tags: ['ecommerce', 'meta ads', 'retargeting'],
    description: 'Built and managed targeted ad campaigns to reach high-intent audiences and convert them into customers. Focused on audience research and retargeting strategies.',
    liveUrl: 'https://formula188cmtablet.vercel.app',
    type: 'website+ads',
    services: ['Ad Campaigns', 'Audience Research', 'Retargeting Strategy', 'Conversion Optimization'],
    stats: {
      revenue: '—',
      roas: '—',
      impressions: '1.2M+',
      ctr: '3.1%',
      conversions: '500+ Orders',
      campaigns: '4',
    },
    thumbnail: '/formula188cm.png',
    year: '2025',
    color: '#4A6B5A',
  },
  {
    slug: 'aavya-rise-wellness',
    name: 'Aavya Rise Wellness',
    tags: ['wellness', 'meta ads', 'local targeting'],
    description: 'Executed Meta Ads campaigns for a wellness centre to generate leads and business enquiries. Focused on local targeting to attract relevant, high-quality prospects.',
    liveUrl: 'https://www.aavya-rise.com',
    type: 'website+ads',
    services: ['Meta Ads', 'Lead Generation', 'Local Targeting', 'Enquiry Generation'],
    stats: {
      revenue: '—',
      roas: '—',
      impressions: '400K+',
      ctr: '2.9%',
      conversions: '150+ Inquiries',
      campaigns: '2',
    },
    thumbnail: '/avya.png',
    year: '2025',
    color: '#0D1210',
  },
  {
    slug: 'motohomies',
    name: 'MotoHomies',
    tags: ['d2c ecommerce', 'meta ads', 'performance'],
    description: 'Managed performance marketing campaigns on Meta Ads to drive consistent daily orders for a D2C eCommerce brand. Handled audience targeting, creatives strategy, and campaign optimization.',
    liveUrl: 'https://www.motohomies.com',
    type: 'website+ads',
    services: ['Performance Marketing', 'Meta Ads', 'Audience Targeting', 'Creative Strategy', 'Optimization'],
    stats: {
      revenue: '$48,000+',
      roas: '4.2x',
      impressions: '2.4M+',
      ctr: '3.8%',
      conversions: '1,200+',
      campaigns: '6',
    },
    thumbnail: '/motohomies.png',
    year: '2024',
    color: '#02462E',
  },
]
