export const MAILS = [
  {
    id: "mail_001",
    threadId: "thread_001",
    type: "PROCESS_REFUND",
    labelIds: ["INBOX"],
    snippet: "Your refund of BTN 1,250 has been processed...",
    payload: {
      headers: [
        { name: "Subject", value: "Refund Processed Successfully" },
        { name: "From", value: "support@onlinestore.com" },
      ],
      body: {
        data: "Your refund of BTN 1,250 has been successfully processed. It may take 2-3 business days to reflect in your account.",
      },
    },
  },
  {
    id: "mail_002",
    threadId: "thread_002",
    labelIds: ["INBOX", "IMPORTANT"],
    snippet: "Announcement regarding planned maintenance...",
    payload: {
      headers: [
        { name: "Subject", value: "Service Outage Announcement" },
        { name: "From", value: "no-reply@servicecloud.com" },
      ],
      body: {
        data: "We will be performing scheduled maintenance tonight from 12:00 AM to 3:00 AM.",
      },
    },
  },
  {
    id: "mail_003",
    threadId: "thread_003",
    type: "REQUEST_FOR_REFUND",
    labelIds: ["INBOX"],
    snippet: "I would like to request a refund for my recent purchase...",
    payload: {
      headers: [
        { name: "Subject", value: "Request for Refund – Order #4521" },
        { name: "From", value: "customer99@gmail.com" },
      ],
      body: {
        data: "Hello, I would like to request a refund for my recent order #4521 due to receiving a defective product.",
      },
    },
  },
  {
    id: "mail_004",
    threadId: "thread_004",
    labelIds: ["INBOX", "PROMOTIONS"],
    snippet: "Exclusive 50% discount just for you...",
    payload: {
      headers: [
        { name: "Subject", value: "Special Offer — 50% Discount!" },
        { name: "From", value: "offers@amazon.com" },
      ],
      body: {
        data: "Enjoy up to 50% discount on electronics until this weekend.",
      },
    },
  },
  {
    id: "mail_005",
    threadId: "thread_005",
    type: "REQUEST_FOR_REFUND",
    labelIds: ["INBOX"],
    snippet: "Please process a refund for my cancelled flight...",
    payload: {
      headers: [
        { name: "Subject", value: "Refund Request — Cancelled Flight" },
        { name: "From", value: "pema87@gmail.com" },
      ],
      body: {
        data: "My flight booking was cancelled automatically. Please process the refund at the earliest.",
      },
    },
  },
  {
    id: "mail_006",
    threadId: "thread_006",
    labelIds: ["INBOX"],
    snippet: "New login detected to your Google account...",
    payload: {
      headers: [
        { name: "Subject", value: "Security Alert — New Login Detected" },
        { name: "From", value: "security@google.com" },
      ],
      body: {
        data: "A new login to your Google account was detected from Thimphu, Bhutan.",
      },
    },
  },
  {
    id: "mail_007",
    threadId: "thread_007",
    labelIds: ["INBOX"],
    snippet: "Meeting reminder for tomorrow...",
    payload: {
      headers: [
        { name: "Subject", value: "Reminder: Project Meeting Tomorrow" },
        { name: "From", value: "teamlead@company.com" },
      ],
      body: {
        data: "This is a reminder for the project meeting scheduled at 10 AM tomorrow.",
      },
    },
  },
  {
    id: "mail_008",
    threadId: "thread_008",
    labelIds: ["INBOX", "SOCIAL"],
    snippet: "You have new friend suggestions...",
    payload: {
      headers: [
        { name: "Subject", value: "New Friend Suggestions" },
        { name: "From", value: "no-reply@facebook.com" },
      ],
      body: {
        data: "People you may know: Karma Tshering, Jigme Dorji, Sonam Lhamo.",
      },
    },
  },
  {
    id: "mail_009",
    threadId: "thread_009",
    type: "PROCESS_REFUND",
    labelIds: ["INBOX"],
    snippet: "Your refund is delayed and needs verification...",
    payload: {
      headers: [
        {
          name: "Subject",
          value: "Refund Delayed — Additional Verification Required",
        },
        { name: "From", value: "support@flightbooker.com" },
      ],
      body: {
        data: "Your refund request is delayed because we require identification verification. Please upload your ID card.",
      },
    },
  },
  {
    id: "mail_010",
    threadId: "thread_010",
    labelIds: ["INBOX"],
    snippet: "System update version 2.8.4 now available...",
    payload: {
      headers: [
        { name: "Subject", value: "System Update Notification" },
        { name: "From", value: "update@softwaresuite.com" },
      ],
      body: {
        data: "Version 2.8.4 is available, including security fixes and performance improvements.",
      },
    },
  },
];
