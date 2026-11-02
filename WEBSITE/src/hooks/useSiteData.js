import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { siteConfig } from '../config/site';

export const useSettings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['public-settings'],
    queryFn: async () => {
      const res = await apiClient.get('/settings');
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const settings = data || {};

  return {
    siteName: settings.siteName || siteConfig.name,
    tagline: settings.tagline || siteConfig.tagline,
    description: settings.footerDescription || siteConfig.description,
    topBarPhone: settings.topBarPhone || siteConfig.contact.phone,
    topBarEmail: settings.topBarEmail || siteConfig.contact.email,
    workingHours: settings.workingHours || siteConfig.contact.workingHours,
    indiaOffice: settings.indiaOffice || siteConfig.contact.indiaOffice,
    usaOffice: settings.usaOffice || siteConfig.contact.usaOffice,
    socialLinks: settings.socialLinks || siteConfig.social,
    googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
    seoDefaults: settings.seoDefaults,
    isLoading,
    error,
  };
};

export const usePageContent = (key, defaultContent = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-page-content', key],
    queryFn: async () => {
      const res = await apiClient.get(`/page-content/${key}`);
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  return {
    content: {
      ...defaultContent,
      ...(data || {}),
    },
    isLoading,
  };
};

export const useServices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-services'],
    queryFn: async () => {
      const res = await apiClient.get('/services');
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const services = data && data.length > 0 ? data : siteConfig.servicesDetailed;
  return { services, isLoading };
};

export const useTechnologies = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-technologies'],
    queryFn: async () => {
      const res = await apiClient.get('/technologies');
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const technologies =
    data && data.length > 0 ? data.map((t) => t.name) : siteConfig.technologies;

  return { technologies, isLoading };
};

export const useFaqs = (page = 'home') => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-faqs', page],
    queryFn: async () => {
      const res = await apiClient.get(`/faqs?page=${page}`);
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const fallback = page === 'contact' ? siteConfig.faqsContact : siteConfig.faqsHome;
  const faqs = data && data.length > 0 ? data : fallback;

  return { faqs, isLoading };
};

export const useProcessSteps = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-process-steps'],
    queryFn: async () => {
      const res = await apiClient.get('/process-steps');
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const steps = data && data.length > 0 ? data : siteConfig.steps;
  return { steps, isLoading };
};

export const useWhyUs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['public-why-us'],
    queryFn: async () => {
      const res = await apiClient.get('/why-us');
      return res.data?.data;
    },
    staleTime: 60 * 1000,
  });

  const items = data && data.length > 0 ? data : siteConfig.whyUs;
  return { items, isLoading };
};

