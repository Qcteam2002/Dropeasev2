import { useState, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import {
  Box,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Icon,
  Card,
  Link,
  Banner,
} from "@shopify/polaris";
import {
  CircleLeftIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "@shopify/polaris-icons";

export function SetupGuide() {
  const loaderData = useLoaderData();
  console.log("Loader data in SetupGuide:", loaderData);

  const [webhookStatus, setWebhookStatus] = useState('checking');
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  
  useEffect(() => {
    checkWebhookStatus();
  }, []);

  const checkWebhookStatus = async () => {
    try {
      const response = await fetch('/api/webhooks/status');
      const data = await response.json();
      setWebhookStatus(data.active ? 'success' : 'failed');
    } catch (error) {
      console.error('Error checking webhook status:', error);
      setWebhookStatus('failed');
    }
  };

  const registerWebhooks = async () => {
    try {
      setWebhookStatus('checking');
      const response = await fetch('/api/webhooks/register', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setWebhookStatus('success');
      } else {
        setWebhookStatus('failed');
      }
    } catch (error) {
      console.error('Error registering webhooks:', error);
      setWebhookStatus('failed');
    }
  };

  const handleTaskComplete = (taskId) => {
    console.log('Task completed:', taskId);
  };

  const handleTaskAction = (task) => {
    console.log('Task action clicked:', task);
    console.log('Action URL:', task.actionUrl);
    
    if (task.actionUrl) {
      window.open(task.actionUrl, '_blank');
    }
  };

  const tasks = [
    {
      id: "add_product_task",
      title: "Feature Highlights",
      complete: false,
      description: "Showcase key product benefits in a clean, visual layout that grabs attention and drives confidence.",
      learnMore: "https://help.shopify.com/manual/products/add-update-products",
      action: "Add to theme",
      actionUrl: loaderData?.deeplinkUrlgridView || "",
      illustration: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboarding-add-import-products-3ceb89e4fef1ee85d58fa00f9a3073a06b41d69463281060dcbee49c6d224904.svg"
    },
    {
      id: "customize_theme_task",
      title: "Customize your online store",
      complete: true,
      illustration: "https://cdn.shopify.com/b/shopify-guidance-dashboard-public/w6vjub24wcsehaquestt90pwtexb.svgz"
    },
    {
      id: "add_domain_task",
      title: "Add a custom domain",
      complete: false,
      description: "Your current domain is storetestfullflow.myshopify.com, but a custom domain that matches your store name can help customers find your online store.",
      learnMore: "https://help.shopify.com/manual/domains",
      action: "Add domain",
      actionUrl: "/store/storetestfullflow/settings/domains",
      illustration: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboarding-domains-5e9cf0c1f040cd3046d72f8f963841b93217c5e0f6d83d1f1bb2e31c6d7e484a.svg"
    },
    {
      id: "setup_shipping_task",
      title: "Confirm your shipping rates",
      complete: false,
      illustration: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboarding-shipping-4b4c6d7234e5af6a7b1e4d76e3865d5b3cfe81c5c79e9f2b7e43dd0d6ef8fbc3.svg"
    },
    {
      id: "setup_payment_task",
      title: "Set up a payment provider",
      complete: false,
      illustration: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboarding-payments-4c5c51bd0ad1d4f7058a15c8fd49247c8b91efd8e58a4fd6ba82f4dba8d6ef93.svg"
    },
    {
      id: "test_order_task",
      title: "Place a test order",
      complete: false,
      description: "Make sure things are running smoothly by placing a test order from your own store.",
      learnMore: "https://help.shopify.com/manual/checkout-settings/test-orders",
      action: "Learn about test orders",
      illustration: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboarding-test-order-c7b0a7d0c1a9f9361e03fc15a37e0e9f1547573843f88cf40d1ef0d33eb3b19b.svg"
    },
  ];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.complete).length;

  return (
    <div className="Polaris-Layout">
      <div className="Polaris-Layout__Section" style={{ maxWidth: "49.75rem" }}>
        <Card>
          <div className="setup-guide">
            {/* {webhookStatus === 'failed' && (
              <Banner
                title="Webhook configuration required"
                tone="warning"
                action={{
                  content: 'Register Webhooks',
                  onAction: registerWebhooks
                }}
              >
                <p>Your app needs to be configured to receive product updates.</p>
              </Banner>
            )} */}

            <div className="setup-guide__header">
              <div className="progress-status">
                <svg viewBox="0 0 24 24" className="progress-ring">
                  <circle 
                    className="progress-ring__circle" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(completedTasks / totalTasks) * 62.83} 62.83`}
                  />
                </svg>
                <span className="progress-text">{completedTasks} of {totalTasks} tasks complete</span>
              </div>

              <Text as="h2" variant="headingMd">Setup guide</Text>
              <Text as="p" color="subdued">
                Use this personalized guide to get your store up and running.
              </Text>
            </div>

            <div className="setup-guide__tasks">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`task-item ${task.complete ? 'is-complete' : ''} ${expandedTaskId === task.id ? 'is-expanded' : ''}`}
                >
                  <div className="task-item__header">
                    <button className="task-status-indicator" onClick={() => handleTaskComplete(task.id)}>
                      {task.complete ? (
                        <svg viewBox="0 0 20 20" className="checkmark-icon">
                          <circle cx="10" cy="10" r="9" fill="var(--p-action-primary)"/>
                          <path 
                            d="M14 7L8.5 12.5L6 10"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" className="incomplete-icon">
                          <circle 
                            cx="10" 
                            cy="10" 
                            r="9" 
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                        </svg>
                      )}
                    </button>

                    <button 
                      className="task-content"
                      onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                    >
                      <Text variant="bodyMd" as="span" fontWeight={task.complete ? "regular" : "semibold"}>
                        {task.title}
                      </Text>
                    </button>
                  </div>

                  {expandedTaskId === task.id && (
                    <div className="task-item__details">
                      <div className="task-content-wrapper">
                        {task.description && (
                          <div className="task-description">
                            <Text as="p" variant="bodyMd">
                              {task.description}
                              {task.learnMore && (
                                <Link url={task.learnMore} external monochrome>
                                  Learn more
                                </Link>
                              )}
                            </Text>
                          </div>
                        )}
                        {task.action && (
                          <div className="task-actions">
                            <Button
                              primary
                              onClick={() => handleTaskAction(task)}
                            >
                              {task.action}
                            </Button>
                            {task.id === 'add_product_task' && (
                              <Button
                                onClick={() => window.open("/store/storetestfullflow/products?modal=import", '_blank')}
                              >
                                Import products
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      {task.illustration && (
                        <div className="task-illustration">
                          <img 
                            alt=""
                            src={task.illustration}
                            width="140"
                            height="140"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .setup-guide {
              padding: var(--p-space-400);
            }

            .setup-guide__header {
              margin-bottom: var(--p-space-400);
            }

            .progress-status {
              display: flex;
              align-items: center;
              gap: var(--p-space-200);
              margin-bottom: var(--p-space-200);
            }

            .progress-ring {
              width: 24px;
              height: 24px;
            }

            .progress-ring__circle {
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
              transition: stroke-dasharray 0.3s ease;
            }

            .task-item {
              border-radius: var(--p-border-radius-200);
              transition: all 0.1s ease;
              background-color: transparent;
            }

            .task-item:hover {
              background-color: var(--p-background-hovered);
            }

            .task-item.is-expanded {
              background-color: var(--p-background-selected);
            }

            .task-item__header {
              display: flex;
              align-items: flex-start;
              gap: var(--p-space-200);
              padding: var(--p-space-200);
              border-radius: var(--p-border-radius-200);
            }

            .task-status-indicator {
              flex-shrink: 0;
              width: 24px;
              height: 24px;
              padding: 0;
              border: none;
              background: none;
              cursor: pointer;
              transition: transform 0.1s ease;
            }

            .task-status-indicator:hover {
              transform: scale(1.1);
            }

            .task-content {
              flex-grow: 1;
              text-align: left;
              padding: var(--p-space-100) 0;
              border: none;
              background: none;
              cursor: pointer;
              transition: opacity 0.1s ease;
              width: 100%;
            }

            .task-content:hover {
              opacity: 0.8;
            }

            .task-item__details {
              position: relative;
              padding: 0 var(--p-space-400) var(--p-space-400) calc(var(--p-space-400) + 24px);
              animation: slideDown 0.2s ease-out;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }

            .task-content-wrapper {
              flex: 1;
              padding-right: var(--p-space-800);
            }

            .task-description {
              margin-bottom: var(--p-space-400);
            }

            .task-description :global(a) {
              margin-left: var(--p-space-200);
              color: var(--p-text-subdued);
              text-decoration: none;
            }

            .task-description :global(a:hover) {
              text-decoration: underline;
            }

            .task-actions {
              display: flex;
              gap: var(--p-space-200);
            }

            .task-illustration {
              flex-shrink: 0;
              width: 140px;
              margin-left: var(--p-space-400);
            }

            .task-illustration img {
              width: 100%;
              height: auto;
              object-fit: contain;
            }

            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .checkmark-icon, .incomplete-icon {
              width: 20px;
              height: 20px;
            }

            .task-item.is-expanded {
              background-color: rgb(241, 242, 243);
            }

            .task-item.is-expanded .task-item__header {
              background-color: rgb(241, 242, 243);
            }

            .task-item.is-expanded .task-content {
              color: rgb(32, 34, 35);
            }

            .task-item.is-expanded:hover {
              background-color: rgb(241, 242, 243);
            }
          `}</style>
        </Card>
      </div>
    </div>
  );
}
