export interface ProfileStat {
    label: string
    value: string
}

export interface ProfileCampaign {
    id: string
    name: string
    status: 'Active' | 'Completed' | 'Draft'
    budget: string
    date: string
}

export interface ProfileData {
    name: string
    handle: string
    role: string
    email: string
    phone: string
    location: string
    company: string
    plan: string
    memberSince: string
    bio: string
    stats: ProfileStat[]
    campaigns: ProfileCampaign[]
}

export const profileData: ProfileData = {
    name: 'Shivprakash Pandey',
    handle: '@shivprakash',
    role: 'Marketing Manager',
    email: 'hpshivprakash@gmail.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    company: 'Northwind Retail Pvt. Ltd.',
    plan: 'Growth Plan',
    memberSince: 'March 2023',
    bio: 'Running influencer campaigns for D2C brands. Focused on performance-driven collaborations across fashion and lifestyle categories.',
    stats: [
        { label: 'Campaigns Run', value: '24' },
        { label: 'Active Influencers', value: '132' },
        { label: 'Total Spend', value: '₹8,42,000' },
        { label: 'Avg. Engagement', value: '6.4%' },
    ],
    campaigns: [
        { id: 'CMP-1042', name: 'Summer Collection Launch', status: 'Active', budget: '₹1,20,000', date: '12 Jun 2026' },
        { id: 'CMP-1038', name: 'Festive Season Push', status: 'Completed', budget: '₹2,50,000', date: '02 May 2026' },
        { id: 'CMP-1031', name: 'Regional Influencer Drive', status: 'Completed', budget: '₹85,000', date: '18 Mar 2026' },
        { id: 'CMP-1027', name: 'New Product Teaser', status: 'Draft', budget: '₹40,000', date: '05 Mar 2026' },
    ],
}
