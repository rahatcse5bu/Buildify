import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'social-media-app',
    name: 'Social Media App',
    description: 'A modern social media application with posts, stories, and messaging',
    category: 'Social',
    thumbnail: '/templates/social-media.jpg',
    config: {
      id: 'social-media-template',
      name: 'Social Media App',
      description: 'A complete social media application',
      screens: [
        {
          id: 'home-feed',
          name: 'Home Feed',
          components: [
            {
              id: 'navbar_1',
              type: 'NavigationBar',
              name: 'Navigation Bar',
              icon: 'Navigation',
              category: 'navigation',
              props: {
                title: 'Social Feed',
                backgroundColor: '#1f2937',
                textColor: '#ffffff',
                showBackButton: false,
                height: 56
              }
            },
            {
              id: 'post_1',
              type: 'Container',
              name: 'Post Container',
              icon: 'Square',
              category: 'layout',
              props: {
                backgroundColor: '#ffffff',
                padding: 16,
                margin: 8,
                borderRadius: 12,
                borderColor: '#e5e7eb',
                borderWidth: 1
              },
              children: [
                {
                  id: 'user_info',
                  type: 'Row',
                  name: 'User Info Row',
                  icon: 'Layout',
                  category: 'layout',
                  props: {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 12,
                    padding: 0
                  },
                  children: [
                    {
                      id: 'profile_pic',
                      type: 'Image',
                      name: 'Profile Picture',
                      icon: 'Image',
                      category: 'media',
                      props: {
                        src: '/placeholder-avatar.jpg',
                        alt: 'User Profile',
                        width: 40,
                        height: 40,
                        borderRadius: 20
                      }
                    },
                    {
                      id: 'username',
                      type: 'Text',
                      name: 'Username',
                      icon: 'Type',
                      category: 'basic',
                      props: {
                        text: 'john_doe',
                        fontSize: 16,
                        color: '#1f2937',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }
                    }
                  ]
                },
                {
                  id: 'post_image',
                  type: 'Image',
                  name: 'Post Image',
                  icon: 'Image',
                  category: 'media',
                  props: {
                    src: '/placeholder-post.jpg',
                    alt: 'Post Content',
                    width: 300,
                    height: 200,
                    borderRadius: 8
                  }
                },
                {
                  id: 'post_text',
                  type: 'Text',
                  name: 'Post Caption',
                  icon: 'Type',
                  category: 'basic',
                  props: {
                    text: 'Amazing sunset today! 🌅 #nature #photography',
                    fontSize: 14,
                    color: '#374151',
                    fontWeight: 'normal',
                    textAlign: 'left'
                  }
                }
              ]
            }
          ]
        }
      ],
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#64748b',
        backgroundColor: '#f8fafc',
        textColor: '#1f2937'
      }
    }
  },
  {
    id: 'e-commerce-app',
    name: 'E-Commerce App',
    description: 'Complete shopping application with product catalog and cart',
    category: 'E-Commerce',
    thumbnail: '/templates/e-commerce.jpg',
    config: {
      id: 'e-commerce-template',
      name: 'E-Commerce App',
      description: 'A full-featured shopping application',
      screens: [
        {
          id: 'product-catalog',
          name: 'Product Catalog',
          components: [
            {
              id: 'header_1',
              type: 'NavigationBar',
              name: 'Navigation Bar',
              icon: 'Navigation',
              category: 'navigation',
              props: {
                title: 'Shop',
                backgroundColor: '#059669',
                textColor: '#ffffff',
                showBackButton: false,
                height: 56
              }
            },
            {
              id: 'search_bar',
              type: 'Input',
              name: 'Search Input',
              icon: 'AlignLeft',
              category: 'form',
              props: {
                placeholder: 'Search products...',
                type: 'text',
                borderColor: '#d1d5db',
                backgroundColor: '#ffffff',
                padding: 12,
                borderRadius: 25
              }
            },
            {
              id: 'product_grid',
              type: 'Container',
              name: 'Product Grid',
              icon: 'Square',
              category: 'layout',
              props: {
                backgroundColor: '#ffffff',
                padding: 16,
                margin: 8,
                borderRadius: 12,
                borderColor: '#e5e7eb',
                borderWidth: 1
              },
              children: [
                {
                  id: 'product_1',
                  type: 'Column',
                  name: 'Product Card',
                  icon: 'Grid',
                  category: 'layout',
                  props: {
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    gap: 8,
                    padding: 12
                  },
                  children: [
                    {
                      id: 'product_image',
                      type: 'Image',
                      name: 'Product Image',
                      icon: 'Image',
                      category: 'media',
                      props: {
                        src: '/placeholder-product.jpg',
                        alt: 'Product',
                        width: 150,
                        height: 150,
                        borderRadius: 8
                      }
                    },
                    {
                      id: 'product_name',
                      type: 'Text',
                      name: 'Product Name',
                      icon: 'Type',
                      category: 'basic',
                      props: {
                        text: 'Premium Headphones',
                        fontSize: 16,
                        color: '#1f2937',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }
                    },
                    {
                      id: 'product_price',
                      type: 'Text',
                      name: 'Product Price',
                      icon: 'Type',
                      category: 'basic',
                      props: {
                        text: '$99.99',
                        fontSize: 18,
                        color: '#059669',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#64748b',
        backgroundColor: '#f0fdf4',
        textColor: '#1f2937'
      }
    }
  },
  {
    id: 'fitness-app',
    name: 'Fitness Tracker',
    description: 'Track workouts, set goals, and monitor progress',
    category: 'Health & Fitness',
    thumbnail: '/templates/fitness.jpg',
    config: {
      id: 'fitness-template',
      name: 'Fitness Tracker',
      description: 'Personal fitness tracking application',
      screens: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          components: [
            {
              id: 'fitness_header',
              type: 'NavigationBar',
              name: 'Navigation Bar',
              icon: 'Navigation',
              category: 'navigation',
              props: {
                title: 'Fitness Dashboard',
                backgroundColor: '#dc2626',
                textColor: '#ffffff',
                showBackButton: false,
                height: 56
              }
            },
            {
              id: 'stats_container',
              type: 'Row',
              name: 'Stats Row',
              icon: 'Layout',
              category: 'layout',
              props: {
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 16,
                padding: 16
              },
              children: [
                {
                  id: 'steps_card',
                  type: 'Container',
                  name: 'Steps Card',
                  icon: 'Square',
                  category: 'layout',
                  props: {
                    backgroundColor: '#ffffff',
                    padding: 16,
                    margin: 0,
                    borderRadius: 12,
                    borderColor: '#e5e7eb',
                    borderWidth: 1
                  },
                  children: [
                    {
                      id: 'steps_text',
                      type: 'Text',
                      name: 'Steps Count',
                      icon: 'Type',
                      category: 'basic',
                      props: {
                        text: '8,245',
                        fontSize: 24,
                        color: '#dc2626',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }
                    },
                    {
                      id: 'steps_label',
                      type: 'Text',
                      name: 'Steps Label',
                      icon: 'Type',
                      category: 'basic',
                      props: {
                        text: 'Steps',
                        fontSize: 12,
                        color: '#6b7280',
                        fontWeight: 'normal',
                        textAlign: 'center'
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: 'progress_chart',
              type: 'Chart',
              name: 'Progress Chart',
              icon: 'BarChart3',
              category: 'advanced',
              props: {
                type: 'bar',
                data: [
                  { label: 'Mon', value: 45 },
                  { label: 'Tue', value: 60 },
                  { label: 'Wed', value: 30 },
                  { label: 'Thu', value: 75 },
                  { label: 'Fri', value: 50 },
                  { label: 'Sat', value: 90 },
                  { label: 'Sun', value: 40 }
                ],
                width: 300,
                height: 200,
                primaryColor: '#dc2626'
              }
            }
          ]
        }
      ],
      theme: {
        primaryColor: '#dc2626',
        secondaryColor: '#64748b',
        backgroundColor: '#fef2f2',
        textColor: '#1f2937'
      }
    }
  },
  {
    id: 'news-app',
    name: 'News Reader',
    description: 'Stay updated with the latest news and articles',
    category: 'News & Media',
    thumbnail: '/templates/news.jpg',
    config: {
      id: 'news-template',
      name: 'News Reader',
      description: 'Modern news reading application',
      screens: [
        {
          id: 'news-feed',
          name: 'News Feed',
          components: [
            {
              id: 'news_header',
              type: 'NavigationBar',
              name: 'Navigation Bar',
              icon: 'Navigation',
              category: 'navigation',
              props: {
                title: 'Daily News',
                backgroundColor: '#1e40af',
                textColor: '#ffffff',
                showBackButton: false,
                height: 56
              }
            },
            {
              id: 'breaking_news',
              type: 'Container',
              name: 'Breaking News',
              icon: 'Square',
              category: 'layout',
              props: {
                backgroundColor: '#ef4444',
                padding: 12,
                margin: 8,
                borderRadius: 8,
                borderColor: '#dc2626',
                borderWidth: 1
              },
              children: [
                {
                  id: 'breaking_text',
                  type: 'Text',
                  name: 'Breaking News Text',
                  icon: 'Type',
                  category: 'basic',
                  props: {
                    text: '🔴 BREAKING: Major technology breakthrough announced',
                    fontSize: 14,
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }
                }
              ]
            },
            {
              id: 'news_list',
              type: 'List',
              name: 'News Articles',
              icon: 'List',
              category: 'layout',
              props: {
                items: [
                  'Tech Giants Announce New Partnership',
                  'Climate Change Summit Begins Tomorrow',
                  'Sports: Championship Finals This Weekend',
                  'Entertainment: New Movie Breaks Records'
                ],
                itemHeight: 80,
                separator: true,
                padding: 8
              }
            }
          ]
        }
      ],
      theme: {
        primaryColor: '#1e40af',
        secondaryColor: '#64748b',
        backgroundColor: '#f0f9ff',
        textColor: '#1f2937'
      }
    }
  }
];

export function getTemplatesByCategory(category?: string) {
  if (!category) return templates;
  return templates.filter(template => template.category === category);
}

export function getTemplateById(id: string) {
  return templates.find(template => template.id === id);
}
