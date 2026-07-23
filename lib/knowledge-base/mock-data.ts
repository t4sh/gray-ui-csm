import type {
  KnowledgeArticle,
  KnowledgeArticleActivity,
  KnowledgeArticleComment,
  KnowledgeArticleExplorerGroup,
  KnowledgeArticleResolvedGroup,
} from "@/lib/knowledge-base/types"
import type { Ticket } from "@/lib/tickets/types"

const sharedPreviewImage = {
  type: "image" as const,
  title: "Billing workspace overview",
  caption:
    "Gradient mock showing the subscription workspace, seat allocation, and invoice preview area.",
  src: "/knowledge-base/billing-seat-wallpaper.png",
}

type KnowledgeArticleDiscussionSeed = {
  comments?: KnowledgeArticleComment[]
  activity?: KnowledgeArticleActivity[]
}

const knowledgeArticleDiscussionById: Record<
  string,
  KnowledgeArticleDiscussionSeed
> = {
  "kb-cancel-order": {
    comments: [
      {
        id: "kb-cancel-order-comment-1",
        articleId: "kb-cancel-order",
        author: { name: "Nina Flores" },
        timestamp: "Yesterday, 11:12 AM",
        body: "Can we call out that cancellation disappears after fulfillment starts? Agents keep asking where the button went.",
        badge: "Support",
        status: "open",
      },
      {
        id: "kb-cancel-order-comment-2",
        articleId: "kb-cancel-order",
        author: { name: "Santi Cazorla" },
        timestamp: "Today, 8:16 AM",
        body: "Added the shipped-order handoff to the return flow so the answer does not stop at a dead end.",
        badge: "Content",
        status: "resolved",
      },
    ],
  },
  "kb-product-exchange": {
    comments: [
      {
        id: "kb-product-exchange-comment-1",
        articleId: "kb-product-exchange",
        author: { name: "Jerome Bell" },
        timestamp: "2 days ago",
        body: "The replacement timing section should stay short. Support only needs the scan trigger and tracking expectation.",
        badge: "Editorial",
        status: "resolved",
      },
      {
        id: "kb-product-exchange-comment-2",
        articleId: "kb-product-exchange",
        author: { name: "Arlene McCoy" },
        timestamp: "Yesterday, 2:03 PM",
        body: "Please add a caveat for limited-stock variants before this goes into the next customer reply bundle.",
        badge: "Review",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-product-exchange-activity-1",
        articleId: "kb-product-exchange",
        title: "Exchange requirements reviewed",
        timestamp: "3 days ago",
        detail: "Jerome Bell confirmed the return-scan requirement with fulfillment operations.",
        tone: "positive",
      },
      {
        id: "kb-product-exchange-activity-2",
        articleId: "kb-product-exchange",
        title: "Limited-stock note requested",
        timestamp: "Yesterday, 2:03 PM",
        detail: "A reviewer asked for guidance when a requested replacement variant is unavailable.",
        tone: "warning",
      },
    ],
  },
  "kb-billing-seat-update": {
    comments: [
      {
        id: "kb-billing-seat-update-comment-1",
        articleId: "kb-billing-seat-update",
        author: { name: "Nina Flores" },
        timestamp: "Yesterday, 3:05 PM",
        body: "The proration explanation is strong, but we should avoid saying taxes always appear in the preview.",
        badge: "Billing",
        status: "open",
      },
      {
        id: "kb-billing-seat-update-comment-2",
        articleId: "kb-billing-seat-update",
        author: { name: "Santi Cazorla" },
        timestamp: "Today, 8:58 AM",
        body: "Adjusted the wording to say tax appears when applicable and kept the renewal amount callout.",
        badge: "Content",
        status: "resolved",
      },
      {
        id: "kb-billing-seat-update-comment-3",
        articleId: "kb-billing-seat-update",
        author: { name: "Arlene McCoy" },
        timestamp: "Today, 1:14 PM",
        body: "Can we reuse this reply in the billing queue macro after the next content sync?",
        badge: "Follow-up",
        status: "open",
      },
    ],
  },
  "kb-login-reset": {
    comments: [
      {
        id: "kb-login-reset-comment-1",
        articleId: "kb-login-reset",
        author: { name: "Amina Rahman" },
        timestamp: "3 days ago",
        body: "I separated self-service reset from admin recovery so agents can pick the right path faster.",
        badge: "Content",
        status: "resolved",
      },
      {
        id: "kb-login-reset-comment-2",
        articleId: "kb-login-reset",
        author: { name: "Liam Chen" },
        timestamp: "Today, 9:01 AM",
        body: "We should link this to the magic-link article once the access group gets cross-article links.",
        badge: "Follow-up",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-login-reset-activity-1",
        articleId: "kb-login-reset",
        title: "Admin recovery section added",
        timestamp: "4 days ago",
        detail: "The article now distinguishes lost-password recovery from email-ownership recovery.",
        tone: "neutral",
      },
      {
        id: "kb-login-reset-activity-2",
        articleId: "kb-login-reset",
        title: "Access queue linked",
        timestamp: "3 days ago",
        detail: "The article was attached to login block and password reset ticket suggestions.",
        tone: "positive",
      },
    ],
  },
  "kb-2fa-recovery-codes": {
    comments: [
      {
        id: "kb-2fa-recovery-codes-comment-1",
        articleId: "kb-2fa-recovery-codes",
        author: { name: "Priya Desai" },
        timestamp: "Yesterday, 10:27 AM",
        body: "Please keep the no-backup-code escalation language precise. This is easy to over-promise.",
        badge: "Security",
        status: "open",
      },
      {
        id: "kb-2fa-recovery-codes-comment-2",
        articleId: "kb-2fa-recovery-codes",
        author: { name: "Liam Chen" },
        timestamp: "Yesterday, 4:54 PM",
        body: "Good call. I softened the bypass wording and made verification the first explicit step.",
        badge: "Content",
        status: "resolved",
      },
    ],
    activity: [
      {
        id: "kb-2fa-recovery-codes-activity-1",
        articleId: "kb-2fa-recovery-codes",
        title: "Security language reviewed",
        timestamp: "Yesterday, 4:54 PM",
        detail: "The temporary bypass guidance was updated after review from the security support queue.",
        tone: "success",
      },
      {
        id: "kb-2fa-recovery-codes-activity-2",
        articleId: "kb-2fa-recovery-codes",
        title: "Recovery workflow tagged",
        timestamp: "Today, 8:35 AM",
        detail: "Tagged for authenticator, backup code, and account verification ticket matching.",
        tone: "neutral",
      },
    ],
  },
  "kb-card-charge-failed": {
    comments: [
      {
        id: "kb-card-charge-failed-comment-1",
        articleId: "kb-card-charge-failed",
        author: { name: "Nina Flores" },
        timestamp: "5 days ago",
        body: "Added the grace-period note because agents were answering seat access differently across renewal failures.",
        badge: "Billing",
        status: "resolved",
      },
      {
        id: "kb-card-charge-failed-comment-2",
        articleId: "kb-card-charge-failed",
        author: { name: "Santi Cazorla" },
        timestamp: "Today, 1:20 PM",
        body: "Can we mention 3DS confirmation in the customer reply, or should it stay in the agent-only context?",
        badge: "Question",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-card-charge-failed-activity-1",
        articleId: "kb-card-charge-failed",
        title: "Renewal failure scenarios expanded",
        timestamp: "8 days ago",
        detail: "Issuer declines, expired cards, 3DS prompts, and temporary bank limits were added as common causes.",
        tone: "neutral",
      },
      {
        id: "kb-card-charge-failed-activity-2",
        articleId: "kb-card-charge-failed",
        title: "Billing review completed",
        timestamp: "5 days ago",
        detail: "Billing operations confirmed the retry guidance and seat access expectations.",
        tone: "success",
      },
    ],
  },
  "kb-download-invoice-pdf": {
    comments: [
      {
        id: "kb-download-invoice-pdf-comment-1",
        articleId: "kb-download-invoice-pdf",
        author: { name: "Arlene McCoy" },
        timestamp: "2 days ago",
        body: "This needs a localization pass before publishing. VAT wording differs for a few supported regions.",
        badge: "Review",
        status: "open",
      },
      {
        id: "kb-download-invoice-pdf-comment-2",
        articleId: "kb-download-invoice-pdf",
        author: { name: "Nina Flores" },
        timestamp: "Today, 9:45 AM",
        body: "I can verify the tax ID update flow once billing profile permissions are final.",
        badge: "Billing",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-download-invoice-pdf-activity-1",
        articleId: "kb-download-invoice-pdf",
        title: "Marked needs review",
        timestamp: "5 days ago",
        detail: "The article was moved back to review while VAT-compliant invoice language is checked.",
        tone: "warning",
      },
      {
        id: "kb-download-invoice-pdf-activity-2",
        articleId: "kb-download-invoice-pdf",
        title: "Billing owner note added",
        timestamp: "2 days ago",
        detail: "Invoice download permissions now call out billing owners explicitly.",
        tone: "neutral",
      },
    ],
  },
  "kb-api-rate-limit": {
    comments: [
      {
        id: "kb-api-rate-limit-comment-1",
        articleId: "kb-api-rate-limit",
        author: { name: "Jerome Bell" },
        timestamp: "4 days ago",
        body: "Added Retry-After guidance so we stop recommending fixed retry intervals in integration tickets.",
        badge: "Technical",
        status: "resolved",
      },
      {
        id: "kb-api-rate-limit-comment-2",
        articleId: "kb-api-rate-limit",
        author: { name: "Amina Rahman" },
        timestamp: "Yesterday, 3:28 PM",
        body: "Can the customer reply mention jitter without sounding too engineering-heavy?",
        badge: "Review",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-api-rate-limit-activity-1",
        articleId: "kb-api-rate-limit",
        title: "Developer docs aligned",
        timestamp: "9 days ago",
        detail: "Rate limit copy was synced with the public developer docs response-header guidance.",
        tone: "positive",
      },
      {
        id: "kb-api-rate-limit-activity-2",
        articleId: "kb-api-rate-limit",
        title: "Backoff recommendation updated",
        timestamp: "4 days ago",
        detail: "Exponential backoff with jitter replaced the previous fixed-delay retry wording.",
        tone: "success",
      },
      {
        id: "kb-api-rate-limit-activity-3",
        articleId: "kb-api-rate-limit",
        title: "Customer reply review opened",
        timestamp: "Yesterday, 3:28 PM",
        detail: "A reviewer requested a less technical version of the retry guidance for customer replies.",
        tone: "warning",
      },
    ],
  },
  "kb-webhook-signature-failed": {
    comments: [
      {
        id: "kb-webhook-signature-failed-comment-1",
        articleId: "kb-webhook-signature-failed",
        author: { name: "Jerome Bell" },
        timestamp: "3 days ago",
        body: "This should stay in needs-review until we add framework-specific raw body examples.",
        badge: "Technical",
        status: "open",
      },
      {
        id: "kb-webhook-signature-failed-comment-2",
        articleId: "kb-webhook-signature-failed",
        author: { name: "Amina Rahman" },
        timestamp: "Today, 11:06 AM",
        body: "I added the staging versus production secret check because that has been the top repeat cause.",
        badge: "Content",
        status: "resolved",
      },
    ],
    activity: [
      {
        id: "kb-webhook-signature-failed-activity-1",
        articleId: "kb-webhook-signature-failed",
        title: "Marked needs review",
        timestamp: "11 days ago",
        detail: "The webhook article was held for technical review before publishing examples.",
        tone: "warning",
      },
      {
        id: "kb-webhook-signature-failed-activity-2",
        articleId: "kb-webhook-signature-failed",
        title: "Secret mismatch section updated",
        timestamp: "Today, 11:06 AM",
        detail: "Production and staging endpoint secret checks were added to the diagnosis path.",
        tone: "neutral",
      },
    ],
  },
  "kb-change-plan-annual-monthly": {
    comments: [
      {
        id: "kb-change-plan-annual-monthly-comment-1",
        articleId: "kb-change-plan-annual-monthly",
        author: { name: "Nina Flores" },
        timestamp: "6 days ago",
        body: "Draft is directionally right, but credit handling needs finance sign-off before agents quote it.",
        badge: "Billing",
        status: "open",
      },
      {
        id: "kb-change-plan-annual-monthly-comment-2",
        articleId: "kb-change-plan-annual-monthly",
        author: { name: "Santi Cazorla" },
        timestamp: "Yesterday, 5:19 PM",
        body: "I kept the customer reply neutral and avoided promising immediate cadence changes.",
        badge: "Content",
        status: "resolved",
      },
    ],
    activity: [
      {
        id: "kb-change-plan-annual-monthly-activity-1",
        articleId: "kb-change-plan-annual-monthly",
        title: "Draft created",
        timestamp: "12 days ago",
        detail: "Santi Cazorla drafted the annual-to-monthly plan change guidance.",
        tone: "neutral",
      },
      {
        id: "kb-change-plan-annual-monthly-activity-2",
        articleId: "kb-change-plan-annual-monthly",
        title: "Finance review requested",
        timestamp: "6 days ago",
        detail: "Credit treatment language was flagged for finance operations review.",
        tone: "warning",
      },
    ],
  },
  "kb-transfer-workspace-ownership": {
    comments: [
      {
        id: "kb-transfer-workspace-ownership-comment-1",
        articleId: "kb-transfer-workspace-ownership",
        author: { name: "Liam Chen" },
        timestamp: "4 days ago",
        body: "The post-transfer checklist should stay visible because billing contact misses create follow-up tickets.",
        badge: "Security",
        status: "resolved",
      },
      {
        id: "kb-transfer-workspace-ownership-comment-2",
        articleId: "kb-transfer-workspace-ownership",
        author: { name: "Priya Desai" },
        timestamp: "Today, 12:42 PM",
        body: "Can we add API token ownership caveats after the next permissions update?",
        badge: "Follow-up",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-transfer-workspace-ownership-activity-1",
        articleId: "kb-transfer-workspace-ownership",
        title: "Ownership prerequisites updated",
        timestamp: "10 days ago",
        detail: "The article now states that the recipient must already be an active admin.",
        tone: "neutral",
      },
      {
        id: "kb-transfer-workspace-ownership-activity-2",
        articleId: "kb-transfer-workspace-ownership",
        title: "Security checklist reviewed",
        timestamp: "4 days ago",
        detail: "Billing contact, API tokens, and security notifications were kept in the post-transfer checks.",
        tone: "success",
      },
    ],
  },
  "kb-login-magic-link-expired": {
    comments: [
      {
        id: "kb-login-magic-link-expired-comment-1",
        articleId: "kb-login-magic-link-expired",
        author: { name: "Amina Rahman" },
        timestamp: "3 days ago",
        body: "Security scanners consuming links is worth keeping. It explains a surprising number of enterprise reports.",
        badge: "Support",
        status: "resolved",
      },
      {
        id: "kb-login-magic-link-expired-comment-2",
        articleId: "kb-login-magic-link-expired",
        author: { name: "Liam Chen" },
        timestamp: "Today, 8:44 AM",
        body: "Let's cross-link this with password reset once article references are editable.",
        badge: "Follow-up",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-login-magic-link-expired-activity-1",
        articleId: "kb-login-magic-link-expired",
        title: "Security scanner cause added",
        timestamp: "7 days ago",
        detail: "The article now explains why some email links are consumed before the customer opens them.",
        tone: "neutral",
      },
      {
        id: "kb-login-magic-link-expired-activity-2",
        articleId: "kb-login-magic-link-expired",
        title: "Access queue suggestion enabled",
        timestamp: "3 days ago",
        detail: "Magic-link expiry tickets now surface this article in suggested replies.",
        tone: "positive",
      },
    ],
  },
  "kb-browser-cache-login-fix": {
    comments: [
      {
        id: "kb-browser-cache-login-fix-comment-1",
        articleId: "kb-browser-cache-login-fix",
        author: { name: "Liam Chen" },
        timestamp: "2 days ago",
        body: "This is still draft because we need browser-specific steps for Safari and Firefox.",
        badge: "Draft",
        status: "open",
      },
      {
        id: "kb-browser-cache-login-fix-comment-2",
        articleId: "kb-browser-cache-login-fix",
        author: { name: "Amina Rahman" },
        timestamp: "Today, 2:11 PM",
        body: "The private-window diagnostic is useful. Please keep it before any destructive cache clearing step.",
        badge: "Review",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-browser-cache-login-fix-activity-1",
        articleId: "kb-browser-cache-login-fix",
        title: "Draft opened",
        timestamp: "9 days ago",
        detail: "A draft article was created for stale browser session troubleshooting.",
        tone: "neutral",
      },
      {
        id: "kb-browser-cache-login-fix-activity-2",
        articleId: "kb-browser-cache-login-fix",
        title: "Browser-specific steps requested",
        timestamp: "2 days ago",
        detail: "Reviewers asked for Safari and Firefox variants before publishing.",
        tone: "warning",
      },
    ],
  },
  "kb-export-failed-timeout": {
    comments: [
      {
        id: "kb-export-failed-timeout-comment-1",
        articleId: "kb-export-failed-timeout",
        author: { name: "Jerome Bell" },
        timestamp: "Yesterday, 1:18 PM",
        body: "The job ID escalation note is good. It gives engineering what they need without asking customers for logs.",
        badge: "Technical",
        status: "resolved",
      },
      {
        id: "kb-export-failed-timeout-comment-2",
        articleId: "kb-export-failed-timeout",
        author: { name: "Nina Flores" },
        timestamp: "Today, 10:33 AM",
        body: "Could we add a line about partial exports? That comes up for larger report ranges.",
        badge: "Review",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-export-failed-timeout-activity-1",
        articleId: "kb-export-failed-timeout",
        title: "Retry guidance published",
        timestamp: "6 days ago",
        detail: "The article now recommends smaller date ranges before escalating failed export jobs.",
        tone: "success",
      },
      {
        id: "kb-export-failed-timeout-activity-2",
        articleId: "kb-export-failed-timeout",
        title: "Partial export follow-up opened",
        timestamp: "Today, 10:33 AM",
        detail: "A reviewer requested clearer wording for export jobs that complete partially.",
        tone: "warning",
      },
    ],
  },
  "kb-domain-verification-stuck": {
    comments: [
      {
        id: "kb-domain-verification-stuck-comment-1",
        articleId: "kb-domain-verification-stuck",
        author: { name: "Nina Flores" },
        timestamp: "2 days ago",
        body: "Needs review until the DNS provider examples are checked. The generic flow is ready.",
        badge: "Review",
        status: "open",
      },
      {
        id: "kb-domain-verification-stuck-comment-2",
        articleId: "kb-domain-verification-stuck",
        author: { name: "Jerome Bell" },
        timestamp: "Today, 11:55 AM",
        body: "I added the duplicate TXT record warning because providers split values in confusing ways.",
        badge: "Technical",
        status: "resolved",
      },
    ],
    activity: [
      {
        id: "kb-domain-verification-stuck-activity-1",
        articleId: "kb-domain-verification-stuck",
        title: "Marked needs review",
        timestamp: "4 days ago",
        detail: "The domain verification article was held while DNS provider examples are checked.",
        tone: "warning",
      },
      {
        id: "kb-domain-verification-stuck-activity-2",
        articleId: "kb-domain-verification-stuck",
        title: "Duplicate record note added",
        timestamp: "Today, 11:55 AM",
        detail: "Troubleshooting now includes duplicate TXT record and split-value checks.",
        tone: "neutral",
      },
    ],
  },
  "kb-audit-log-access": {
    comments: [
      {
        id: "kb-audit-log-access-comment-1",
        articleId: "kb-audit-log-access",
        author: { name: "Priya Desai" },
        timestamp: "Yesterday, 4:32 PM",
        body: "Please keep this focused on visibility and permissions. We should not list every event type here.",
        badge: "Security",
        status: "resolved",
      },
      {
        id: "kb-audit-log-access-comment-2",
        articleId: "kb-audit-log-access",
        author: { name: "Santi Cazorla" },
        timestamp: "Today, 9:18 AM",
        body: "I kept the customer reply short and left event examples in the body only.",
        badge: "Content",
        status: "resolved",
      },
    ],
    activity: [
      {
        id: "kb-audit-log-access-activity-1",
        articleId: "kb-audit-log-access",
        title: "Security permissions reviewed",
        timestamp: "3 days ago",
        detail: "Workspace owner and eligible admin access rules were confirmed for the audit log.",
        tone: "success",
      },
      {
        id: "kb-audit-log-access-activity-2",
        articleId: "kb-audit-log-access",
        title: "Customer reply shortened",
        timestamp: "Today, 9:18 AM",
        detail: "The reply now points to Admin Center > Security > Audit log without exposing extra internal detail.",
        tone: "neutral",
      },
    ],
  },
}

function withKnowledgeArticleDiscussion(articles: KnowledgeArticle[]) {
  return articles.map((article) => {
    const discussion = knowledgeArticleDiscussionById[article.id]
    const comments = article.comments ?? discussion?.comments
    const activity = article.activity ?? discussion?.activity

    return {
      ...article,
      ...(comments
        ? {
            comments,
            commentsCount: comments.length,
          }
        : {}),
      ...(activity
        ? {
            activity,
            activityCount: activity.length,
          }
        : {}),
    }
  })
}

export const knowledgeArticles: KnowledgeArticle[] = withKnowledgeArticleDiscussion([
  {
    id: "kb-return-refund-policy",
    title: "Return and refund policy",
    summary:
      "Step-by-step guide for returning a product, exchanging an item, or requesting a refund within 30 days of purchase.",
    category: "other",
    status: "published",
    updatedAt: "Updated 3 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "high",
    views: 241,
    helpfulRate: 78,
    linkedTickets: 12,
    matchReasons: ["wrong product", "return", "swap", "refund"],
    quickPath: "Account > Orders > Select order > Return / Exchange",
    media: [
      {
        type: "image",
        title: "Return request screen",
        caption: "Example state after a customer selects the order to return.",
        src: "/knowledge-base/billing-seat-wallpaper.png",
      },
      {
        type: "video",
        title: "Return and exchange walkthrough",
        duration: "2:14",
      },
    ],
    sections: [
      {
        title: "Return window",
        body: "Customers can request a return or exchange within 30 days of purchase when the item is unused and in original packaging.",
      },
      {
        title: "Before shipment",
        body: "If the order is still processing, the customer can cancel it from order history and place a new order with the correct item.",
      },
      {
        title: "Exchange process",
        body: "For a different variant, color, or size, select Exchange instead of Return. The replacement ships after the original item is received.",
      },
      {
        title: "Refund timeline",
        body: "Refunds are usually processed within 5-7 business days after the returned item is received and reviewed.",
      },
    ],
    customerReply:
      "Here is our return and exchange guide for this situation: Return and refund policy. It explains how to start a return, exchange an item, or cancel before shipment when the order is still processing.",
    comments: [
      {
        id: "kb-return-refund-policy-comment-1",
        articleId: "kb-return-refund-policy",
        author: { name: "Arlene McCoy" },
        timestamp: "Yesterday, 4:18 PM",
        body: "I tightened the refund timeline language so support can quote it directly without adding a second policy caveat.",
        badge: "Editorial",
        status: "resolved",
      },
      {
        id: "kb-return-refund-policy-comment-2",
        articleId: "kb-return-refund-policy",
        author: { name: "Jason Support Lab", avatarUrl: "/avatars/avatar-profile.jpg" },
        timestamp: "Today, 9:22 AM",
        body: "Can we keep the exchange path visible near the top? This article gets inserted most often when the customer wants a different variant, not only a refund.",
        badge: "Review",
        status: "open",
      },
      {
        id: "kb-return-refund-policy-comment-3",
        articleId: "kb-return-refund-policy",
        author: { name: "Santi Cazorla" },
        timestamp: "Today, 10:04 AM",
        body: "Added the before-shipment cancellation note to reduce follow-up tickets where the order is still processing.",
        badge: "Content",
        status: "open",
      },
    ],
    activity: [
      {
        id: "kb-return-refund-policy-activity-1",
        articleId: "kb-return-refund-policy",
        title: "Article published",
        timestamp: "3 days ago",
        detail: "Arlene McCoy published the latest return and refund policy for support use.",
        tone: "success",
      },
      {
        id: "kb-return-refund-policy-activity-2",
        articleId: "kb-return-refund-policy",
        title: "Refund timeline updated",
        timestamp: "Yesterday, 4:18 PM",
        detail: "The refund window was tightened to 5-7 business days after the returned item is reviewed.",
        tone: "neutral",
      },
      {
        id: "kb-return-refund-policy-activity-3",
        articleId: "kb-return-refund-policy",
        title: "Editorial comment resolved",
        timestamp: "Today, 9:40 AM",
        detail: "A review thread about quoting the policy directly was marked resolved.",
        tone: "positive",
      },
      {
        id: "kb-return-refund-policy-activity-4",
        articleId: "kb-return-refund-policy",
        title: "Customer reply refreshed",
        timestamp: "Today, 10:04 AM",
        detail: "The suggested customer reply was updated to include cancellation before shipment.",
        tone: "neutral",
      },
    ],
  },
  {
    id: "kb-cancel-order",
    title: "How to cancel an order before shipment",
    summary:
      "Cancel or modify an order while it is still in processing status from the customer account dashboard.",
    category: "other",
    status: "published",
    updatedAt: "Updated 1 week ago",
    author: { name: "Santi Cazorla" },
    matchScore: "medium",
    views: 189,
    helpfulRate: 65,
    linkedTickets: 7,
    matchReasons: ["cancel order", "processing", "wrong item"],
    quickPath: "Account > Orders > Processing orders > Cancel order",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "When cancellation is available",
        body: "Customers can cancel an order while its status is Processing. Once the item has shipped, they need to use the return flow.",
      },
      {
        title: "Customer steps",
        body: "Open order history, select the active order, then choose Cancel order. A confirmation email is sent after cancellation succeeds.",
      },
    ],
    customerReply:
      "If your order is still processing, you may be able to cancel it from Account > Orders and reorder the correct item. Once it ships, the return or exchange flow is the right path.",
    activity: [
      {
        id: "kb-cancel-order-activity-1",
        articleId: "kb-cancel-order",
        title: "Article published",
        timestamp: "1 week ago",
        detail: "Santi Cazorla published the cancellation workflow for orders still in processing.",
        tone: "success",
      },
      {
        id: "kb-cancel-order-activity-2",
        articleId: "kb-cancel-order",
        title: "Return flow cross-link reviewed",
        timestamp: "6 days ago",
        detail: "The article was checked against the return policy for shipped orders.",
        tone: "neutral",
      },
    ],
  },
  {
    id: "kb-product-exchange",
    title: "Product exchange process",
    summary:
      "How to swap a product for a different variant, color, or size through the support portal.",
    category: "other",
    status: "published",
    updatedAt: "Updated 6 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "medium",
    views: 92,
    helpfulRate: 71,
    linkedTickets: 5,
    matchReasons: ["exchange", "variant", "wrong color"],
    quickPath: "Support portal > Orders > Exchange item",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Exchange requirements",
        body: "The original product must be unused and returned in its original packaging before the replacement item is shipped.",
      },
      {
        title: "Replacement timing",
        body: "Replacement orders are created after the return scan is received. Customers receive tracking as soon as the replacement ships.",
      },
    ],
    customerReply:
      "For exchanges, start from the support portal and choose Exchange item. The replacement is created after the original item is returned.",
  },
  {
    id: "kb-billing-seat-update",
    title: "Adding seats to a subscription",
    summary:
      "How account admins can add seats, review prorated billing, and confirm invoice changes before the next renewal.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 1 day ago",
    author: { name: "Santi Cazorla" },
    matchScore: "high",
    views: 354,
    helpfulRate: 90,
    linkedTickets: 21,
    matchReasons: ["subscription", "seat", "billing", "invoice"],
    quickPath: "Admin Center > Account > Billing > Subscription",
    media: [
      sharedPreviewImage,
    ],
    sections: [
      {
        title: "When to use this article",
        body: "Use this when a customer needs more paid seats, asks why the invoice changed after adding teammates, or wants confirmation before the next renewal. The flow applies to active paid subscriptions only.",
      },
      {
        title: "Who can add seats",
        body: "Only account admins and billing owners can add seats to a paid subscription. If the requester is a workspace member, ask them to contact an admin or add the current billing owner to the thread.",
      },
      {
        title: "Add seats from billing",
        body: "Open Admin Center > Account > Billing > Subscription, choose Add seats, enter the number of additional seats, and review the updated seat count before continuing.",
      },
      {
        title: "Review prorated cost",
        body: "The checkout preview shows the prorated cost for the current billing cycle, the next renewal amount, tax if applicable, and the payment method that will be charged.",
      },
      {
        title: "Confirm invoice changes",
        body: "After confirmation, the new seats become available immediately. The prorated charge appears on the next invoice summary and the account activity log records the admin who approved the change.",
      },
      {
        title: "Troubleshooting",
        body: "If Add seats is disabled, check whether the account is on a trial, has an unpaid invoice, uses reseller billing, or has a pending subscription change. Escalate to Billing Operations when the invoice preview fails to load.",
      },
    ],
    customerReply:
      "An account admin can add seats from Admin Center > Account > Billing > Subscription. Before confirming, they will see the prorated charge for this billing cycle and the updated renewal amount.",
    activity: [
      {
        id: "kb-billing-seat-update-activity-1",
        articleId: "kb-billing-seat-update",
        title: "Article linked to billing queue",
        timestamp: "2 days ago",
        detail: "Support operations linked this article to subscription and invoice change tickets.",
        tone: "positive",
      },
      {
        id: "kb-billing-seat-update-activity-2",
        articleId: "kb-billing-seat-update",
        title: "Proration section updated",
        timestamp: "1 day ago",
        detail: "The checkout preview guidance now calls out taxes, renewal amount, and payment method.",
        tone: "neutral",
      },
    ],
  },
  {
    id: "kb-update-payment-method",
    title: "Update payment method before renewal",
    summary:
      "Help billing owners replace an expiring card, confirm the default payment method, and retry open invoices before renewal.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 2 days ago",
    author: { name: "Nina Flores" },
    matchScore: "high",
    views: 296,
    helpfulRate: 86,
    linkedTickets: 18,
    matchReasons: ["payment method", "card", "renewal", "retry invoice"],
    quickPath: "Admin Center > Billing > Payment methods",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "When to use this article",
        body: "Use this when a customer needs to replace an expired card, confirm which card will be charged at renewal, or retry a failed invoice after updating payment details.",
      },
      {
        title: "Who can update payment",
        body: "Only billing owners and account admins with billing permissions can add, remove, or set the default payment method. Members can view neither full card details nor invoice retry controls.",
      },
      {
        title: "Set the default card",
        body: "Open Payment methods, add the new card, complete any 3DS confirmation, then set it as default before removing the old card. Leaving the old card as default can cause the next retry to fail again.",
      },
      {
        title: "Retry an open invoice",
        body: "After the card is set as default, return to Invoices and choose Retry payment on the open invoice. The invoice status updates after the processor confirms the charge.",
      },
      {
        title: "Escalation checks",
        body: "Escalate to Billing Operations if the card token saves successfully but invoice retry fails with processor_unavailable, duplicate charge warning, or a mismatch between invoice currency and payment method region.",
      },
    ],
    customerReply:
      "A billing owner can update the default card from Admin Center > Billing > Payment methods, then retry any open invoice from Billing > Invoices.",
  },
  {
    id: "kb-cancel-subscription-at-renewal",
    title: "Cancel subscription at renewal",
    summary:
      "Explain how billing owners schedule cancellation, what happens to access, and how to reverse the cancellation before renewal.",
    category: "subscription",
    status: "needs-review",
    updatedAt: "Updated 4 days ago",
    author: { name: "Santi Cazorla" },
    matchScore: "medium",
    views: 184,
    helpfulRate: 73,
    linkedTickets: 12,
    matchReasons: ["cancel subscription", "renewal", "plan", "downgrade"],
    quickPath: "Admin Center > Billing > Subscription > Cancel plan",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Cancellation timing",
        body: "Most paid plans can be scheduled to cancel at the end of the current billing period. Immediate cancellation requires billing review when the account has open invoices, annual commitments, or reseller billing.",
      },
      {
        title: "Access after scheduling",
        body: "The workspace remains active until the renewal date. Admins can still add or remove members, export data, and reverse the cancellation before the scheduled end date.",
      },
      {
        title: "What the customer sees",
        body: "The subscription page shows the scheduled cancellation date, renewal amount set to zero, and a banner explaining when paid features will stop.",
      },
      {
        title: "Reverse cancellation",
        body: "Billing owners can choose Keep subscription before the scheduled cancellation date. The workspace returns to the previous renewal state without needing a new checkout.",
      },
      {
        title: "Before closing the ticket",
        body: "Confirm whether the customer needs a data export, invoice copy, or downgrade alternative. Do not promise refunds unless the billing policy and finance review both support it.",
      },
    ],
    customerReply:
      "A billing owner can schedule cancellation from Billing > Subscription. The workspace stays active until the current billing period ends, and the cancellation can be reversed before that date.",
  },
  {
    id: "kb-invoice-recipient-update",
    title: "Change invoice recipients",
    summary:
      "Show admins how to add finance contacts, send invoice copies, and keep billing emails separate from workspace ownership.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 6 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "medium",
    views: 147,
    helpfulRate: 82,
    linkedTickets: 9,
    matchReasons: ["invoice recipient", "billing email", "finance contact", "invoice copy"],
    quickPath: "Admin Center > Billing > Billing profile > Invoice recipients",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Recipient types",
        body: "Invoice recipients receive invoice and receipt emails but do not automatically get workspace admin permissions. This is useful for finance teams that should receive billing records only.",
      },
      {
        title: "Add or remove recipients",
        body: "Open Billing profile, edit Invoice recipients, then add the finance contact email. Removed recipients stop receiving future invoices but past email deliveries cannot be recalled.",
      },
      {
        title: "Send a copy of a past invoice",
        body: "From Invoices, open the invoice detail and choose Send copy. The copy goes to active invoice recipients and the billing owner unless a specific recipient is selected.",
      },
      {
        title: "Verification notes",
        body: "Some enterprise accounts require recipient verification before the first invoice email is delivered. Ask the customer to check spam filters and allow billing sender domains.",
      },
      {
        title: "Common confusion",
        body: "Changing invoice recipients does not change the billing owner, legal company name, tax ID, or default payment method.",
      },
    ],
    customerReply:
      "You can add finance contacts from Billing profile > Invoice recipients. They will receive future invoice emails without gaining workspace admin access.",
  },
  {
    id: "kb-usage-overage-explained",
    title: "Usage overage charges explained",
    summary:
      "Clarify why usage-based charges appear, how customers can review consumption, and what to check before disputing an invoice.",
    category: "billing",
    status: "draft",
    updatedAt: "Updated 1 week ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 121,
    helpfulRate: 70,
    linkedTickets: 6,
    matchReasons: ["overage", "usage", "invoice", "charge"],
    quickPath: "Admin Center > Billing > Usage",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "What counts as usage",
        body: "Usage charges can come from automation runs, integration events, data exports, or seats above plan allowance depending on the customer's contract.",
      },
      {
        title: "Where to review usage",
        body: "Billing owners can open Usage to see the current cycle total, recent daily usage, and projected invoice impact before renewal.",
      },
      {
        title: "Invoice timing",
        body: "Usage is usually billed at the end of the cycle. Late-arriving integration events can appear after the customer first checks the usage page.",
      },
      {
        title: "Dispute preparation",
        body: "Before escalating, capture the invoice number, usage category, date range, and any customer-provided internal usage logs. Finance needs those details to reconcile the charge.",
      },
      {
        title: "Reduce future overage",
        body: "Suggest usage alerts, automation throttles, or plan review when the customer repeatedly exceeds included limits.",
      },
    ],
    customerReply:
      "You can review usage from Admin Center > Billing > Usage. If a charge still looks unexpected, send us the invoice number and usage category so we can reconcile it.",
  },
  {
    id: "kb-billing-address-tax-id",
    title: "Update billing address and tax ID",
    summary:
      "Help billing owners update legal billing details, understand when tax IDs appear, and avoid mismatched invoice records.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 2 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "high",
    views: 231,
    helpfulRate: 87,
    linkedTickets: 15,
    matchReasons: ["billing address", "tax id", "vat", "company name"],
    quickPath: "Admin Center > Billing > Billing profile",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "What can be changed",
        body: "Billing owners can update legal company name, billing address, tax ID, and invoice email details from the billing profile.",
      },
      {
        title: "When changes apply",
        body: "Profile changes apply to future invoices. Past invoices keep the legal details that were active when the invoice was issued.",
      },
      {
        title: "Tax validation",
        body: "Tax IDs may require validation before appearing on invoices. Ask customers to confirm country, registration number, and legal company name match their tax record.",
      },
      {
        title: "Past invoice corrections",
        body: "Do not promise reissued invoices automatically. Escalate to Billing Operations when a customer needs a corrected invoice for a closed billing period.",
      },
      {
        title: "Common confusion",
        body: "Changing the billing profile does not change workspace owner, payment method, invoice recipients, or account display name.",
      },
    ],
    customerReply:
      "A billing owner can update legal billing details from Billing > Billing profile. The updated details apply to future invoices; past invoice corrections need billing review.",
  },
  {
    id: "kb-purchase-order-number",
    title: "Add purchase order number to invoices",
    summary:
      "Show finance teams where to store a PO number and explain which future invoices will include the reference.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 3 days ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 143,
    helpfulRate: 79,
    linkedTickets: 8,
    matchReasons: ["purchase order", "po number", "invoice reference", "finance"],
    quickPath: "Admin Center > Billing > Billing profile > Invoice details",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Where to add the PO",
        body: "Billing owners can add a purchase order number from Billing profile under Invoice details. The value appears in the invoice reference area.",
      },
      {
        title: "Future invoice behavior",
        body: "The PO number applies to invoices generated after the value is saved. Existing invoices do not update retroactively.",
      },
      {
        title: "Character limits",
        body: "PO fields should stay short and plain text. If the customer needs multiple finance references, recommend using the billing note field when available.",
      },
      {
        title: "Renewal preparation",
        body: "Ask finance teams to add or update the PO before renewal week so the next invoice is generated with the correct reference.",
      },
      {
        title: "Escalation",
        body: "Escalate only when the PO was saved before invoice generation but does not appear on the issued invoice.",
      },
    ],
    customerReply:
      "You can add the PO number from Billing profile > Invoice details. It will appear on future invoices generated after the update is saved.",
  },
  {
    id: "kb-refund-credit-request",
    title: "Request refund or account credit",
    summary:
      "Guide agents through refund eligibility, credit alternatives, and the details Billing Operations needs before review.",
    category: "billing",
    status: "needs-review",
    updatedAt: "Updated 4 days ago",
    author: { name: "Santi Cazorla" },
    matchScore: "medium",
    views: 168,
    helpfulRate: 74,
    linkedTickets: 11,
    matchReasons: ["refund", "credit", "invoice adjustment", "billing review"],
    quickPath: "Admin Center > Billing > Invoices > Invoice detail",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Start with policy",
        body: "Refunds depend on plan terms, billing period, contract commitments, and whether the charge was caused by product error or customer-requested change.",
      },
      {
        title: "Credit alternative",
        body: "When a cash refund is not available, Billing Operations may offer account credit toward a future invoice if policy allows it.",
      },
      {
        title: "Required details",
        body: "Capture invoice number, charge amount, reason for request, requested outcome, and any supporting context before escalating.",
      },
      {
        title: "What agents can say",
        body: "Agents can confirm they will request review. They should not promise approval, timing, or exact refund method before billing review is complete.",
      },
      {
        title: "Follow-up expectation",
        body: "Billing Operations responds after checking payment status, contract terms, and prior credits on the account.",
      },
    ],
    customerReply:
      "I can request a billing review for this charge. Please share the invoice number and reason for the refund or credit request so Billing Operations can evaluate it.",
  },
  {
    id: "kb-reseller-billing-managed-account",
    title: "Reseller-managed billing account",
    summary:
      "Explain why direct billing controls are disabled when an account is billed through a partner or reseller.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 5 days ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 126,
    helpfulRate: 76,
    linkedTickets: 7,
    matchReasons: ["reseller", "partner billing", "billing disabled", "managed account"],
    quickPath: "Admin Center > Billing > Subscription",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Why controls are disabled",
        body: "Payment method, invoice download, plan changes, and cancellation controls may be disabled when the account is billed through a reseller.",
      },
      {
        title: "Who owns invoices",
        body: "The reseller usually issues invoices and manages payment terms directly with the customer. The workspace may only show subscription summary details.",
      },
      {
        title: "What support can do",
        body: "Support can confirm the account is reseller-managed and direct the customer to the partner contact listed in billing settings when available.",
      },
      {
        title: "Plan changes",
        body: "Seat additions, plan upgrades, cancellations, and contract changes need reseller coordination unless the account has been transferred back to direct billing.",
      },
      {
        title: "Escalation",
        body: "Escalate if the customer believes reseller billing is wrong, the listed partner is outdated, or direct billing controls should be restored.",
      },
    ],
    customerReply:
      "This workspace appears to be billed through a reseller, so direct invoice and payment controls may be disabled. Please contact the listed partner for billing changes.",
  },
  {
    id: "kb-renewal-date-change",
    title: "Change subscription renewal date",
    summary:
      "Set expectations for renewal date changes, proration review, and contract alignment before customers plan billing changes.",
    category: "subscription",
    status: "draft",
    updatedAt: "Updated 6 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "low",
    views: 94,
    helpfulRate: 68,
    linkedTickets: 5,
    matchReasons: ["renewal date", "billing cycle", "proration", "contract"],
    quickPath: "Admin Center > Billing > Subscription",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Self-service availability",
        body: "Most renewal dates cannot be changed directly from the workspace because billing cycles are tied to invoice generation and contract terms.",
      },
      {
        title: "When review is possible",
        body: "Billing Operations may review date alignment for enterprise contract changes, finance calendar alignment, or migration from reseller to direct billing.",
      },
      {
        title: "Proration impact",
        body: "Changing renewal timing can create prorated charges or credits. Do not quote an amount until Billing Operations provides the calculation.",
      },
      {
        title: "Required context",
        body: "Collect current renewal date, desired date, reason for change, plan type, and whether the account has open invoices.",
      },
      {
        title: "Alternatives",
        body: "If the date cannot change, suggest invoice recipient updates or PO notes to help the customer's finance process.",
      },
    ],
    customerReply:
      "Renewal date changes require billing review because they can affect invoices and proration. Please share the desired date and reason so Billing Operations can evaluate it.",
  },
  {
    id: "kb-upgrade-plan-midcycle",
    title: "Upgrade plan mid-cycle",
    summary:
      "Explain how admins can upgrade during an active billing cycle, what becomes available immediately, and how proration is calculated.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 1 week ago",
    author: { name: "Santi Cazorla" },
    matchScore: "high",
    views: 253,
    helpfulRate: 88,
    linkedTickets: 19,
    matchReasons: ["upgrade plan", "mid cycle", "features", "proration"],
    quickPath: "Admin Center > Billing > Subscription > Change plan",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Who can upgrade",
        body: "Billing owners and account admins with plan permissions can upgrade a paid subscription from the subscription page.",
      },
      {
        title: "Preview before confirming",
        body: "The checkout preview shows new plan price, prorated charge for the current cycle, next renewal amount, and payment method.",
      },
      {
        title: "Feature availability",
        body: "Most upgraded features become available immediately after confirmation. Some limits refresh after background entitlement sync completes.",
      },
      {
        title: "Open invoice check",
        body: "If the account has an unpaid invoice, the upgrade button may be disabled until the invoice is resolved.",
      },
      {
        title: "After upgrade",
        body: "Recommend confirming seat limits, feature access, and billing contact details before closing the ticket.",
      },
    ],
    customerReply:
      "A billing owner can upgrade from Billing > Subscription > Change plan. The checkout preview shows the prorated charge and updated renewal amount before confirmation.",
  },
  {
    id: "kb-downgrade-plan-limitations",
    title: "Downgrade plan limitations",
    summary:
      "Prepare customers for downgrade requirements, feature loss, seat limits, and timing before changing to a lower plan.",
    category: "subscription",
    status: "needs-review",
    updatedAt: "Updated 8 days ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 137,
    helpfulRate: 72,
    linkedTickets: 9,
    matchReasons: ["downgrade", "plan limits", "feature loss", "seats"],
    quickPath: "Admin Center > Billing > Subscription > Change plan",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Timing",
        body: "Downgrades usually take effect at the next renewal so the customer can continue using paid features for the current billing period.",
      },
      {
        title: "Plan requirements",
        body: "The workspace may need to reduce seats, remove advanced automation rules, or disable premium integrations before the downgrade can be scheduled.",
      },
      {
        title: "Data retention",
        body: "Historical records are typically retained, but access to premium views or exports may be limited after the downgrade takes effect.",
      },
      {
        title: "Customer preparation",
        body: "Encourage admins to export needed reports and review automation dependencies before the renewal date.",
      },
      {
        title: "Escalate when",
        body: "Escalate if the customer needs an immediate downgrade, contract exception, or assurance about a feature not listed in the downgrade preview.",
      },
    ],
    customerReply:
      "Downgrades usually take effect at renewal. The preview will show any seat, feature, or integration changes needed before the lower plan can be scheduled.",
  },
  {
    id: "kb-billing-owner-transfer",
    title: "Transfer billing owner role",
    summary:
      "Help admins move billing ownership to the right finance or operations contact without interrupting subscription management.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 9 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "medium",
    views: 156,
    helpfulRate: 81,
    linkedTickets: 8,
    matchReasons: ["billing owner", "transfer", "finance", "admin"],
    quickPath: "Admin Center > Billing > Billing profile > Billing owner",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Who can transfer",
        body: "Current billing owners and workspace owners can assign a new billing owner when the recipient is already an active admin.",
      },
      {
        title: "Recipient requirements",
        body: "The new billing owner should have a verified email, admin access, and permission to manage invoices, payment methods, and subscription changes.",
      },
      {
        title: "What changes",
        body: "The new billing owner receives billing notifications and can update payment details. Workspace ownership and security ownership do not change.",
      },
      {
        title: "Before transferring",
        body: "Confirm invoice recipients, payment method access, and finance contact details so no renewal notices are missed.",
      },
      {
        title: "If the current owner left",
        body: "Use workspace owner verification or support-assisted recovery when the current billing owner is no longer available.",
      },
    ],
    customerReply:
      "A workspace owner or current billing owner can transfer billing ownership from Billing profile once the recipient is an active admin.",
  },
  {
    id: "kb-login-reset",
    title: "Resetting account access",
    summary:
      "Troubleshoot login blocks, password reset issues, and admin-assisted account recovery.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 4 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "high",
    views: 176,
    helpfulRate: 74,
    linkedTickets: 9,
    matchReasons: ["login", "access", "password", "reset"],
    quickPath: "Sign in > Forgot password > Verify email",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Self-service reset",
        body: "Customers can reset their password from the sign-in screen after verifying the email tied to their account.",
      },
      {
        title: "Admin recovery",
        body: "If the customer no longer has email access, an account admin can verify ownership and request support-assisted recovery.",
      },
    ],
    customerReply:
      "For access issues, start with Forgot password on the sign-in screen. If you no longer have access to that email, an account admin can request recovery.",
  },
  {
    id: "kb-2fa-recovery-codes",
    title: "Recover account with backup codes",
    summary:
      "Guide customers through two-factor recovery when their authenticator device is lost or unavailable.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 2 days ago",
    author: { name: "Liam Chen" },
    matchScore: "high",
    views: 154,
    helpfulRate: 81,
    linkedTickets: 11,
    matchReasons: ["2fa", "backup code", "authenticator", "recovery"],
    quickPath: "Profile > Security > Backup codes",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Use backup codes first",
        body: "If the customer saved recovery codes, they can use one code to sign in and then enroll a new authenticator app.",
      },
      {
        title: "No backup code available",
        body: "Verify account ownership through the support checklist, then trigger a temporary 2FA bypass valid for one sign-in session.",
      },
    ],
    customerReply:
      "If you still have your backup codes, use one to sign in and set up a new authenticator device. If not, we can help after account verification.",
  },
  {
    id: "kb-sso-login-failed",
    title: "SSO login failed for managed users",
    summary:
      "Troubleshoot SAML and OIDC sign-in failures caused by IdP assignment, domain mismatch, or stale workspace metadata.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 3 days ago",
    author: { name: "Priya Desai" },
    matchScore: "high",
    views: 226,
    helpfulRate: 84,
    linkedTickets: 16,
    matchReasons: ["sso", "saml", "oidc", "login failed", "idp"],
    quickPath: "Admin Center > Security > Single sign-on",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Start with the error",
        body: "Ask for the exact error shown after redirect. Invalid audience, user not assigned, and email domain mismatch point to different SSO configuration checks.",
      },
      {
        title: "Confirm user assignment",
        body: "The customer must be assigned to the application in the identity provider and must use an email domain claimed by the workspace.",
      },
      {
        title: "Check workspace metadata",
        body: "If certificates or callback URLs changed recently, have an admin download the latest service provider metadata and update the identity provider configuration.",
      },
      {
        title: "Bypass options",
        body: "Do not recommend password reset for SSO-enforced users. If the admin is locked out, use the verified owner recovery path instead.",
      },
      {
        title: "Escalation packet",
        body: "Collect workspace slug, IdP name, timestamp, request ID, and the SAML or OIDC error text before escalating to Security Support.",
      },
    ],
    customerReply:
      "SSO failures usually come from IdP assignment, domain mismatch, or stale metadata. Please confirm the user is assigned in your identity provider and share the exact error if it still fails.",
  },
  {
    id: "kb-invite-expired",
    title: "Workspace invite expired",
    summary:
      "Guide admins through resending invitations, checking member status, and resolving email filters that block invite delivery.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 5 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "medium",
    views: 168,
    helpfulRate: 79,
    linkedTickets: 8,
    matchReasons: ["invite", "expired", "resend", "member"],
    quickPath: "Admin Center > Members > Pending invites",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Invite lifetime",
        body: "Workspace invitations expire after a limited window for security. Expired links cannot be reactivated; an admin needs to send a fresh invite.",
      },
      {
        title: "Resend from pending invites",
        body: "Open Pending invites, find the email address, and choose Resend invite. If the email was typed incorrectly, delete the pending invite and create a new one.",
      },
      {
        title: "Email delivery checks",
        body: "Ask the recipient to check spam filters and allow the workspace invitation sender. Enterprise mail gateways may quarantine invite links.",
      },
      {
        title: "Existing account conflict",
        body: "If the user already belongs to another workspace, they should accept the invite from the same browser profile where they are signed in with the invited email.",
      },
      {
        title: "Admin-facing note",
        body: "Resending an invite does not change the assigned role, team, or seat allocation. Edit those values before resending if the original invite was wrong.",
      },
    ],
    customerReply:
      "An admin can resend the invite from Admin Center > Members > Pending invites. If the email was mistyped, delete the pending invite and create a new one.",
  },
  {
    id: "kb-role-permission-denied",
    title: "Role permission denied message",
    summary:
      "Explain why users see permission errors and how admins can confirm role, team, and feature entitlement access.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 6 days ago",
    author: { name: "Liam Chen" },
    matchScore: "medium",
    views: 139,
    helpfulRate: 76,
    linkedTickets: 7,
    matchReasons: ["permission denied", "role", "access", "admin"],
    quickPath: "Admin Center > Members > Roles",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Common causes",
        body: "Permission errors usually mean the user has the wrong role, belongs to the wrong team, or the workspace plan does not include the feature they are trying to open.",
      },
      {
        title: "Check role assignment",
        body: "Admins should open the member profile and confirm role, team membership, and any feature-specific permission toggles.",
      },
      {
        title: "Plan entitlement",
        body: "Some admin surfaces only appear on advanced plans. If the role is correct but the page is still hidden, check the subscription entitlement before escalating.",
      },
      {
        title: "Session refresh",
        body: "After a role change, ask the user to refresh the app or sign out and back in. Permission claims can remain cached in an active session for a short time.",
      },
      {
        title: "What not to suggest",
        body: "Do not tell a customer to create a second account to bypass permissions. That creates audit and billing confusion.",
      },
    ],
    customerReply:
      "This usually means your role or team permissions need to be updated. Ask a workspace admin to confirm your role in Admin Center > Members > Roles.",
  },
  {
    id: "kb-session-timeout-policy",
    title: "Session timeout and forced sign-out",
    summary:
      "Clarify why users are signed out, how admin security policies affect session length, and what support can safely recommend.",
    category: "account-login",
    status: "draft",
    updatedAt: "Updated 1 week ago",
    author: { name: "Priya Desai" },
    matchScore: "low",
    views: 97,
    helpfulRate: 69,
    linkedTickets: 4,
    matchReasons: ["session", "timeout", "signed out", "security policy"],
    quickPath: "Admin Center > Security > Session policy",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Why sign-out happens",
        body: "Users can be signed out by inactivity timeout, admin-initiated session revocation, password changes, SSO policy changes, or browser cookie cleanup.",
      },
      {
        title: "Admin policy check",
        body: "Workspace admins can review session timeout settings from Security > Session policy. Enterprise policies may enforce shorter sessions for all managed users.",
      },
      {
        title: "Customer troubleshooting",
        body: "Ask whether sign-out happens across all browsers or only one device. Device-specific reports often point to blocked cookies or local storage cleanup.",
      },
      {
        title: "Security-sensitive wording",
        body: "Do not disclose whether another admin revoked a session unless the requester has the required security role.",
      },
      {
        title: "Escalate when",
        body: "Escalate if active sessions end immediately after sign-in across multiple browsers and no workspace policy explains the behavior.",
      },
    ],
    customerReply:
      "Forced sign-out can come from workspace session policy, SSO changes, or local browser storage. A workspace admin can review the session policy in Security settings.",
  },
  {
    id: "kb-card-charge-failed",
    title: "Payment failed during renewal",
    summary:
      "Troubleshoot failed card charges, retry windows, and what happens to seat access during payment grace periods.",
    category: "billing",
    status: "published",
    updatedAt: "Updated 8 days ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 208,
    helpfulRate: 76,
    linkedTickets: 14,
    matchReasons: ["payment failed", "renewal", "card", "invoice"],
    quickPath: "Admin Center > Billing > Invoices",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Common reasons",
        body: "Cards may fail due to issuer declines, expired expiration dates, missing 3DS confirmation, or temporary bank limits.",
      },
      {
        title: "Retry behavior",
        body: "The system retries charges automatically across several days. Billing owners also receive email reminders with a direct payment link.",
      },
    ],
    customerReply:
      "We were unable to complete the renewal charge. Please update your payment method in Billing > Invoices and retry the outstanding invoice.",
  },
  {
    id: "kb-download-invoice-pdf",
    title: "Download VAT-compliant invoices",
    summary:
      "Where to find invoice PDFs, tax IDs, and localized billing details from the admin billing workspace.",
    category: "billing",
    status: "needs-review",
    updatedAt: "Updated 5 days ago",
    author: { name: "Arlene McCoy" },
    matchScore: "medium",
    views: 131,
    helpfulRate: 72,
    linkedTickets: 8,
    matchReasons: ["invoice", "vat", "tax id", "pdf"],
    quickPath: "Admin Center > Billing > Invoices > Download PDF",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Invoice availability",
        body: "Invoices become available immediately after successful payment and remain downloadable for all billing owners.",
      },
      {
        title: "Tax information",
        body: "Tax IDs and company legal names can be updated from Billing profile and appear on future invoices.",
      },
    ],
    customerReply:
      "You can download the invoice PDF from Admin Center > Billing > Invoices. If your tax details changed, update the billing profile for future invoices.",
  },
  {
    id: "kb-api-rate-limit",
    title: "API rate limit and retry strategy",
    summary:
      "Explains request limits, burst windows, response headers, and safe backoff guidance for integration stability.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 9 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "high",
    views: 267,
    helpfulRate: 83,
    linkedTickets: 19,
    matchReasons: ["api", "rate limit", "429", "retry"],
    quickPath: "Developer docs > API limits",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Limit model",
        body: "Each workspace has per-minute quotas and short burst ceilings. Exceeding either returns HTTP 429 with reset hints.",
      },
      {
        title: "Backoff pattern",
        body: "Use exponential backoff with jitter and honor Retry-After when present. Avoid synchronized retries from multiple workers.",
      },
    ],
    customerReply:
      "Your integration is hitting API limits. Please apply exponential backoff and Retry-After handling to reduce repeated 429 responses.",
  },
  {
    id: "kb-webhook-signature-failed",
    title: "Webhook signature verification failed",
    summary:
      "Diagnose invalid webhook signatures caused by raw body parsing, secret mismatches, or replayed delivery payloads.",
    category: "technical",
    status: "needs-review",
    updatedAt: "Updated 11 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "medium",
    views: 88,
    helpfulRate: 69,
    linkedTickets: 6,
    matchReasons: ["webhook", "signature", "invalid", "secret"],
    quickPath: "Developer docs > Webhooks > Security",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Raw payload requirement",
        body: "Signature checks must use the exact raw request body bytes before JSON parsing or middleware mutation.",
      },
      {
        title: "Secret management",
        body: "Verify the endpoint secret in production and staging separately. A wrong environment secret is the most common mismatch.",
      },
    ],
    customerReply:
      "Webhook signatures usually fail when the raw request body is altered or the endpoint secret does not match. Please verify both first.",
  },
  {
    id: "kb-change-plan-annual-monthly",
    title: "Switch from annual to monthly plan",
    summary:
      "How billing owners can change billing cadence, review effective dates, and understand credit treatment.",
    category: "subscription",
    status: "draft",
    updatedAt: "Updated 12 days ago",
    author: { name: "Santi Cazorla" },
    matchScore: "low",
    views: 119,
    helpfulRate: 67,
    linkedTickets: 5,
    matchReasons: ["plan", "annual", "monthly", "downgrade"],
    quickPath: "Admin Center > Billing > Subscription > Change plan",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Effective date",
        body: "Cadence changes usually take effect at the next renewal unless a billing admin confirms immediate proration.",
      },
      {
        title: "Credit handling",
        body: "Unused annual value is prorated and applied as a credit to upcoming monthly invoices when eligible.",
      },
    ],
    customerReply:
      "You can change billing cadence from Billing > Subscription. We will show whether the change applies now or at the next renewal.",
  },
  {
    id: "kb-transfer-workspace-ownership",
    title: "Transfer workspace ownership",
    summary:
      "Required steps to move workspace ownership to another admin without interrupting billing or API access.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 10 days ago",
    author: { name: "Liam Chen" },
    matchScore: "medium",
    views: 143,
    helpfulRate: 79,
    linkedTickets: 10,
    matchReasons: ["owner", "transfer", "admin", "workspace"],
    quickPath: "Admin Center > Members > Roles",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Prerequisites",
        body: "The target user must already be an active admin. Ownership transfer cannot be completed to pending invites.",
      },
      {
        title: "Post-transfer checks",
        body: "Confirm billing contact, API tokens, and security notifications are assigned to the new owner profile.",
      },
    ],
    customerReply:
      "To transfer ownership, promote the recipient to admin first, then complete the transfer in Members > Roles and verify billing contact details.",
  },
  {
    id: "kb-login-magic-link-expired",
    title: "Magic sign-in link expired",
    summary:
      "Help customers request a fresh sign-in link and diagnose common causes of expired or reused authentication emails.",
    category: "account-login",
    status: "published",
    updatedAt: "Updated 7 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "medium",
    views: 118,
    helpfulRate: 77,
    linkedTickets: 6,
    matchReasons: ["magic link", "expired", "email login", "sign in"],
    quickPath: "Sign in > Email link > Resend link",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Most common causes",
        body: "Magic links expire after a short window and become invalid after the first successful use. Security scanners that pre-open email links can also consume them.",
      },
      {
        title: "What to tell the customer",
        body: "Ask the customer to request a fresh email, open the newest message only, and complete sign-in from the same browser session where possible.",
      },
    ],
    customerReply:
      "That sign-in link has probably expired or was already used. Please request a new email link and open only the latest message.",
  },
  {
    id: "kb-browser-cache-login-fix",
    title: "Clear browser cache for login issues",
    summary:
      "Troubleshoot session loops, blank auth callbacks, and stale browser storage that blocks successful sign-in.",
    category: "account-login",
    status: "draft",
    updatedAt: "Updated 9 days ago",
    author: { name: "Liam Chen" },
    matchScore: "low",
    views: 74,
    helpfulRate: 68,
    linkedTickets: 4,
    matchReasons: ["cache", "cookies", "login loop", "browser"],
    quickPath: "Browser settings > Clear site data",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "When this helps",
        body: "Use this when sign-in redirects keep looping, the callback page stays blank, or the customer can log in successfully in a private window only.",
      },
      {
        title: "Recommended steps",
        body: "Clear cookies and cached files for the workspace domain, then restart the browser tab and retry the sign-in flow once.",
      },
    ],
    customerReply:
      "This looks like stale browser session data. Please clear cookies for the workspace site and try the sign-in flow again.",
  },
  {
    id: "kb-export-failed-timeout",
    title: "Export job failed or timed out",
    summary:
      "Guide customers through large export retries, timeout expectations, and the right checks before escalating a failed data export.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 6 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "medium",
    views: 133,
    helpfulRate: 75,
    linkedTickets: 7,
    matchReasons: ["export", "timeout", "csv", "download failed"],
    quickPath: "Reports > Export history",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Why exports fail",
        body: "Exports often fail when the selected date range is too large, the report includes archived records, or the browser closes before the background job completes.",
      },
      {
        title: "Safe retry pattern",
        body: "Retry with a smaller date range first, then check export history for partial completions before escalating the job ID to support engineering.",
      },
    ],
    customerReply:
      "Please retry the export with a smaller date range first, then check Export history. If it still fails, share the job ID so we can investigate.",
  },
  {
    id: "kb-domain-verification-stuck",
    title: "Domain verification still pending",
    summary:
      "Resolve stuck DNS verification states for integrations by checking propagation, record conflicts, and expected verification delays.",
    category: "technical",
    status: "needs-review",
    updatedAt: "Updated 4 days ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 96,
    helpfulRate: 73,
    linkedTickets: 5,
    matchReasons: ["domain", "dns", "verification", "pending"],
    quickPath: "Settings > Domains > Verify",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Expected wait time",
        body: "DNS verification can take several minutes to several hours depending on provider TTL and whether the new TXT record conflicts with an older value.",
      },
      {
        title: "What to verify",
        body: "Confirm the hostname, record type, and exact TXT value. Remove duplicate verification records when the provider UI split the string unexpectedly.",
      },
    ],
    customerReply:
      "Your domain record may still be propagating. Please confirm the TXT record exactly matches the latest verification value and allow additional DNS propagation time.",
  },
  {
    id: "kb-email-not-delivered",
    title: "Customer emails not delivered",
    summary:
      "Troubleshoot missing transactional emails, blocked sender domains, bounced recipients, and delayed delivery queues.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 2 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "high",
    views: 218,
    helpfulRate: 82,
    linkedTickets: 13,
    matchReasons: ["email", "not delivered", "bounce", "spam"],
    quickPath: "Settings > Email logs",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Start with delivery logs",
        body: "Open Email logs and search by recipient email, event type, and approximate timestamp. Delivered, bounced, deferred, and suppressed statuses require different next steps.",
      },
      {
        title: "Bounce and suppression",
        body: "If the address is suppressed after repeated bounces, ask the customer to confirm the mailbox exists before requesting suppression removal.",
      },
      {
        title: "Spam filter checks",
        body: "Ask the customer's IT team to allow the sender domain and IP pool. Enterprise filters can accept the message but quarantine links silently.",
      },
      {
        title: "Delayed delivery",
        body: "Deferred delivery usually means the receiving server asked us to retry later. Avoid promising immediate delivery while the retry window is active.",
      },
      {
        title: "Escalation detail",
        body: "Escalate with recipient, message type, timestamp, delivery status, and message ID. Engineering cannot investigate quickly from a screenshot alone.",
      },
    ],
    customerReply:
      "We can check delivery logs for the recipient and message type. Please confirm the recipient email and approximate time the email should have arrived.",
  },
  {
    id: "kb-import-csv-validation",
    title: "CSV import validation errors",
    summary:
      "Help customers resolve import failures caused by required fields, duplicate IDs, invalid dates, and malformed CSV encoding.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 5 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "medium",
    views: 164,
    helpfulRate: 77,
    linkedTickets: 9,
    matchReasons: ["csv", "import", "validation", "upload failed"],
    quickPath: "Settings > Data import > Import history",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Download the error file",
        body: "Import history includes a row-level error file when validation fails. Ask the customer to download it before editing the source spreadsheet.",
      },
      {
        title: "Required fields",
        body: "Name, email, external ID, and workspace ID may be required depending on import type. Blank required values cause the entire row to be skipped.",
      },
      {
        title: "Duplicate identifiers",
        body: "Duplicate external IDs or email addresses can update existing records unexpectedly. Have the customer de-duplicate before retrying.",
      },
      {
        title: "Date and encoding issues",
        body: "Use ISO date format when possible and export CSV as UTF-8. Smart quotes, hidden formulas, and region-specific date formats are common causes of validation errors.",
      },
      {
        title: "Safe retry",
        body: "Retry with a small sample file first. Once the sample imports cleanly, use the corrected full file.",
      },
    ],
    customerReply:
      "Please download the row-level error file from Import history, correct the listed fields, and retry with a small sample before uploading the full CSV again.",
  },
  {
    id: "kb-report-loading-slow",
    title: "Report loading slowly",
    summary:
      "Diagnose slow dashboard and report loads by checking date range, filters, workspace size, and recent background processing.",
    category: "technical",
    status: "needs-review",
    updatedAt: "Updated 1 week ago",
    author: { name: "Nina Flores" },
    matchScore: "medium",
    views: 102,
    helpfulRate: 71,
    linkedTickets: 5,
    matchReasons: ["report", "slow", "dashboard", "loading"],
    quickPath: "Reports > Performance diagnostics",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Narrow the report",
        body: "Ask the customer to test a smaller date range and fewer segment filters. Very broad reports can trigger larger warehouse scans.",
      },
      {
        title: "Check background processing",
        body: "Recent imports, automation runs, or large exports can delay report refreshes while derived metrics catch up.",
      },
      {
        title: "Browser versus account issue",
        body: "If the report loads slowly for one user only, test a private window and another browser. If every admin sees it, capture workspace-level details.",
      },
      {
        title: "What to capture",
        body: "Collect report name, date range, filters, workspace size, timestamp, and whether the loading state eventually completes or fails.",
      },
      {
        title: "Temporary workaround",
        body: "Suggest exporting a narrower report or saving a filtered view while support investigates the broader report.",
      },
    ],
    customerReply:
      "Please try a narrower date range and fewer filters first. If the report is still slow, send the report name, filters, and approximate load time so we can investigate.",
  },
  {
    id: "kb-mobile-push-notifications",
    title: "Mobile push notifications not arriving",
    summary:
      "Troubleshoot missing mobile alerts across device permissions, workspace notification rules, and quiet-hours settings.",
    category: "technical",
    status: "draft",
    updatedAt: "Updated 8 days ago",
    author: { name: "Liam Chen" },
    matchScore: "low",
    views: 81,
    helpfulRate: 68,
    linkedTickets: 4,
    matchReasons: ["push notification", "mobile", "alerts", "quiet hours"],
    quickPath: "Profile > Notifications > Mobile push",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Device permission",
        body: "Confirm notifications are allowed at the operating system level. If permission is denied, workspace settings cannot deliver push alerts.",
      },
      {
        title: "Workspace rules",
        body: "Check whether the customer muted the relevant queue, ticket type, or account segment. Push settings can differ from email notifications.",
      },
      {
        title: "Quiet hours",
        body: "Quiet hours suppress non-urgent notifications until the configured window ends. Priority alerts may still appear depending on workspace policy.",
      },
      {
        title: "Re-register the device",
        body: "Signing out and back into the mobile app refreshes the device token. Use this after permission and workspace settings are confirmed.",
      },
      {
        title: "Escalation details",
        body: "Collect device OS, app version, affected notification type, expected timestamp, and whether email or in-app notifications arrived.",
      },
    ],
    customerReply:
      "Please confirm mobile notifications are allowed on your device, then check Profile > Notifications > Mobile push for muted queues or quiet-hours settings.",
  },
  {
    id: "kb-oauth-token-expired",
    title: "OAuth token expired for integration",
    summary:
      "Help customers reconnect integrations when refresh tokens expire, scopes change, or an admin revokes access at the provider.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 3 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "high",
    views: 244,
    helpfulRate: 85,
    linkedTickets: 17,
    matchReasons: ["oauth", "token expired", "integration", "reconnect"],
    quickPath: "Settings > Integrations > Connected apps",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Symptoms",
        body: "Expired tokens usually show as sync paused, authorization_required, or repeated 401 responses in integration logs.",
      },
      {
        title: "Reconnect the app",
        body: "An integration admin should open Connected apps, choose Reconnect, and complete provider authorization with the account that owns the integration.",
      },
      {
        title: "Scope changes",
        body: "If the provider changed required scopes, the reconnect prompt may request additional permission. The customer must approve the new scope set for sync to resume.",
      },
      {
        title: "Provider-side revocation",
        body: "If the token was revoked from the provider admin console, reconnecting inside the product is required. Retrying sync alone will not refresh access.",
      },
      {
        title: "After reconnecting",
        body: "Run a manual sync and check integration logs for the next successful event before closing the ticket.",
      },
    ],
    customerReply:
      "An integration admin can reconnect the app from Settings > Integrations > Connected apps. After reconnecting, run a manual sync to confirm events resume.",
  },
  {
    id: "kb-api-key-rotation",
    title: "Rotate API keys safely",
    summary:
      "Guide customers through creating a replacement key, updating services, and retiring old API keys without downtime.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 4 days ago",
    author: { name: "Priya Desai" },
    matchScore: "medium",
    views: 177,
    helpfulRate: 80,
    linkedTickets: 10,
    matchReasons: ["api key", "rotation", "secret", "developer"],
    quickPath: "Developer settings > API keys",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Create before revoking",
        body: "Create a new key first and store it in the customer's secret manager. Revoking the old key before deployment can break production traffic.",
      },
      {
        title: "Update services",
        body: "Replace the key in all services, background workers, scheduled jobs, and local deployment secrets. Some customers forget non-production environments.",
      },
      {
        title: "Verify traffic",
        body: "Check API logs for successful requests using the new key before deleting the old key. Look for the integration name or key label.",
      },
      {
        title: "Retire the old key",
        body: "After traffic is confirmed, revoke the old key and monitor for 401 errors from forgotten services.",
      },
      {
        title: "Incident rotation",
        body: "If the key may be compromised, recommend immediate revocation and incident escalation instead of a gradual rotation.",
      },
    ],
    customerReply:
      "Create a new API key, update every service that uses it, confirm successful requests in API logs, then revoke the old key.",
  },
  {
    id: "kb-webhook-retry-policy",
    title: "Webhook retry policy",
    summary:
      "Explain retry schedules, idempotency expectations, and how customers can replay failed webhook deliveries.",
    category: "technical",
    status: "published",
    updatedAt: "Updated 6 days ago",
    author: { name: "Jerome Bell" },
    matchScore: "medium",
    views: 152,
    helpfulRate: 78,
    linkedTickets: 8,
    matchReasons: ["webhook", "retry", "delivery", "replay"],
    quickPath: "Developer settings > Webhooks > Delivery logs",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Automatic retries",
        body: "Failed webhook deliveries are retried with backoff when the endpoint returns a retryable status or times out.",
      },
      {
        title: "Non-retryable failures",
        body: "Permanent 4xx responses usually stop automatic retries because they indicate endpoint configuration or authorization problems.",
      },
      {
        title: "Replay delivery",
        body: "Customers can replay a failed delivery from Delivery logs after fixing the endpoint. Replay sends the original payload again.",
      },
      {
        title: "Idempotency requirement",
        body: "Consumers should handle duplicate events safely. A successful retry or replay may deliver an event the endpoint partially processed earlier.",
      },
      {
        title: "Escalation packet",
        body: "Collect endpoint URL, delivery ID, response status, response body, and timestamp before escalating.",
      },
    ],
    customerReply:
      "After fixing the endpoint, you can replay failed webhook deliveries from Delivery logs. Make sure your handler safely accepts duplicate events.",
  },
  {
    id: "kb-zapier-connection-stale",
    title: "Zapier connection stopped syncing",
    summary:
      "Help customers refresh a stale Zapier connection, verify trigger setup, and avoid duplicate automation events after reconnecting.",
    category: "technical",
    status: "draft",
    updatedAt: "Updated 9 days ago",
    author: { name: "Amina Rahman" },
    matchScore: "low",
    views: 67,
    helpfulRate: 66,
    linkedTickets: 3,
    matchReasons: ["zapier", "sync", "automation", "connection"],
    quickPath: "Settings > Integrations > Zapier",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Check Zap history",
        body: "Ask the customer to review Zap history first. Task failures reveal whether the issue is authentication, field mapping, or a downstream app error.",
      },
      {
        title: "Reconnect account",
        body: "Reconnect the app account in Zapier, then refresh the connection inside product integration settings if the workspace still shows stale authorization.",
      },
      {
        title: "Trigger changes",
        body: "If the customer changed queue, segment, or event filters, Zapier may need the trigger sample refreshed before new events match.",
      },
      {
        title: "Duplicate event caution",
        body: "Replaying failed tasks can create duplicate downstream records if the Zap does not use an idempotent identifier.",
      },
      {
        title: "When to escalate",
        body: "Escalate when product integration logs show successful delivery but Zapier task history never receives the event.",
      },
    ],
    customerReply:
      "Please check Zap history, reconnect the app account, and refresh the trigger sample. Be careful replaying tasks if the Zap can create duplicate records.",
  },
  {
    id: "kb-audit-log-access",
    title: "View audit log and admin activity",
    summary:
      "Explain which roles can access audit history and where admins can review security-sensitive workspace actions.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 3 days ago",
    author: { name: "Santi Cazorla" },
    matchScore: "low",
    views: 111,
    helpfulRate: 80,
    linkedTickets: 6,
    matchReasons: ["audit log", "admin activity", "security history", "workspace actions"],
    quickPath: "Admin Center > Security > Audit log",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Who can access it",
        body: "Only workspace owners and admins with security permissions can open the audit log. Regular members cannot view admin-only activity history.",
      },
      {
        title: "What it includes",
        body: "Audit history includes role changes, security setting updates, authentication events, and selected billing actions tied to an actor and timestamp.",
      },
    ],
    customerReply:
      "Workspace owners and eligible admins can review this from Admin Center > Security > Audit log.",
  },
  {
    id: "kb-remove-member-deactivate",
    title: "Remove or deactivate a member",
    summary:
      "Explain the difference between removing a user, deactivating access, preserving ownership, and freeing a paid seat.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 2 days ago",
    author: { name: "Liam Chen" },
    matchScore: "high",
    views: 205,
    helpfulRate: 83,
    linkedTickets: 14,
    matchReasons: ["remove member", "deactivate", "seat", "user"],
    quickPath: "Admin Center > Members > Member profile",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Remove versus deactivate",
        body: "Removing a member fully revokes workspace access. Deactivation keeps the account record available for audit history while blocking sign-in.",
      },
      {
        title: "Before removing",
        body: "Transfer owned automations, saved views, API tokens, and billing responsibilities before removing the user. Some owned resources may pause when the owner loses access.",
      },
      {
        title: "Seat impact",
        body: "Removing or deactivating a paid member frees a seat only after the billing system syncs the member count. The subscription does not automatically downgrade.",
      },
      {
        title: "Audit history",
        body: "Past actions remain attributed to the removed user. Do not suggest deleting audit history to hide former user activity.",
      },
      {
        title: "Reactivation",
        body: "A deactivated member can be reactivated by an eligible admin. Removed users need a new invitation.",
      },
    ],
    customerReply:
      "An admin can remove or deactivate a user from Admin Center > Members. Transfer owned resources first so automations, tokens, and billing responsibilities keep working.",
  },
  {
    id: "kb-merge-workspaces",
    title: "Merge duplicate workspaces",
    summary:
      "Set expectations for duplicate workspace cleanup, data export options, member migration, and limits of automated merging.",
    category: "subscription",
    status: "needs-review",
    updatedAt: "Updated 4 days ago",
    author: { name: "Santi Cazorla" },
    matchScore: "medium",
    views: 126,
    helpfulRate: 72,
    linkedTickets: 6,
    matchReasons: ["merge workspace", "duplicate workspace", "migration", "members"],
    quickPath: "Admin Center > Workspace settings",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Merge limitations",
        body: "Workspaces cannot always be merged automatically because tickets, audit logs, integrations, billing records, and ownership metadata may conflict.",
      },
      {
        title: "Recommended path",
        body: "Choose the destination workspace, export needed records from the duplicate workspace, invite members to the destination, and disable new activity in the duplicate workspace.",
      },
      {
        title: "Billing coordination",
        body: "If both workspaces are paid, Billing Operations must review plan, invoice, and credit treatment before cancellation or consolidation.",
      },
      {
        title: "Integration review",
        body: "Move integrations carefully. API keys, webhook endpoints, and OAuth connections are workspace-specific and usually need to be recreated.",
      },
      {
        title: "Escalation criteria",
        body: "Escalate when the customer requests backend data migration, ownership conflict resolution, or invoice consolidation across workspaces.",
      },
    ],
    customerReply:
      "Most duplicate workspace cleanup is handled by choosing a destination workspace, exporting needed data, inviting members, and coordinating billing before closing the duplicate workspace.",
  },
  {
    id: "kb-export-audit-log",
    title: "Export audit log for compliance",
    summary:
      "Guide eligible admins through filtering, exporting, and securely sharing audit history for compliance review.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 5 days ago",
    author: { name: "Priya Desai" },
    matchScore: "medium",
    views: 154,
    helpfulRate: 81,
    linkedTickets: 8,
    matchReasons: ["audit export", "compliance", "security", "admin activity"],
    quickPath: "Admin Center > Security > Audit log > Export",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Who can export",
        body: "Only workspace owners and admins with security permissions can export audit logs. Regular admins may be able to view but not export depending on policy.",
      },
      {
        title: "Filter before export",
        body: "Use date range, actor, event type, and resource filters to reduce export size and make compliance review easier.",
      },
      {
        title: "Export format",
        body: "Exports include timestamp, actor, event type, affected resource, and metadata when available. Sensitive payload fields may be redacted.",
      },
      {
        title: "Secure handling",
        body: "Audit exports can contain security-sensitive activity. Recommend sharing through the customer's approved secure file process, not email attachments.",
      },
      {
        title: "Large export behavior",
        body: "Large date ranges may create a background job. The admin receives an in-app notification when the export is ready.",
      },
    ],
    customerReply:
      "Eligible admins can filter and export audit history from Admin Center > Security > Audit log. For large ranges, the export may run as a background job.",
  },
  {
    id: "kb-manage-notification-preferences",
    title: "Manage notification preferences",
    summary:
      "Help users tune email, in-app, and mobile notifications without missing important queue, account, or assignment updates.",
    category: "subscription",
    status: "published",
    updatedAt: "Updated 1 week ago",
    author: { name: "Amina Rahman" },
    matchScore: "low",
    views: 118,
    helpfulRate: 74,
    linkedTickets: 5,
    matchReasons: ["notification", "email", "in-app", "preferences"],
    quickPath: "Profile > Notifications",
    media: [sharedPreviewImage],
    sections: [
      {
        title: "Notification channels",
        body: "Users can manage email, in-app, and mobile push preferences separately. Turning off email does not mute in-app notifications.",
      },
      {
        title: "Event categories",
        body: "Preferences can differ for assignments, mentions, account health changes, automation alerts, and queue activity.",
      },
      {
        title: "Workspace defaults",
        body: "Admins may enforce required notifications for security or billing events. Required notifications cannot be muted by individual users.",
      },
      {
        title: "Quiet hours",
        body: "Quiet hours suppress selected notifications during a configured window. Critical alerts may still be delivered depending on workspace policy.",
      },
      {
        title: "Troubleshooting missing alerts",
        body: "Check channel preferences, muted queues, browser permission, mobile permission, and whether the user is assigned to the account or ticket.",
      },
    ],
    customerReply:
      "You can tune email, in-app, and mobile notifications from Profile > Notifications. Some required workspace alerts may stay enabled by admin policy.",
  },
])

const categoryFallbackOrder = [
  "kb-return-refund-policy",
  "kb-cancel-order",
  "kb-product-exchange",
]

export const knowledgeArticleExplorerGroups: KnowledgeArticleExplorerGroup[] = [
  {
    id: "billing-plans",
    label: "Billing & Plans",
    icon: "credit-card",
    defaultOpen: true,
    articleIds: [
      "kb-billing-seat-update",
      "kb-update-payment-method",
      "kb-change-plan-annual-monthly",
      "kb-cancel-subscription-at-renewal",
      "kb-download-invoice-pdf",
      "kb-card-charge-failed",
      "kb-invoice-recipient-update",
      "kb-usage-overage-explained",
      "kb-billing-address-tax-id",
      "kb-purchase-order-number",
      "kb-refund-credit-request",
      "kb-reseller-billing-managed-account",
      "kb-renewal-date-change",
      "kb-upgrade-plan-midcycle",
      "kb-downgrade-plan-limitations",
      "kb-billing-owner-transfer",
    ],
  },
  {
    id: "access-security",
    label: "Access & Security",
    icon: "shield",
    defaultOpen: true,
    articleIds: [
      "kb-login-reset",
      "kb-sso-login-failed",
      "kb-2fa-recovery-codes",
      "kb-invite-expired",
      "kb-role-permission-denied",
      "kb-login-magic-link-expired",
      "kb-browser-cache-login-fix",
      "kb-session-timeout-policy",
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: "tool",
    articleIds: [
      "kb-return-refund-policy",
      "kb-cancel-order",
      "kb-product-exchange",
      "kb-export-failed-timeout",
      "kb-email-not-delivered",
      "kb-import-csv-validation",
      "kb-report-loading-slow",
      "kb-mobile-push-notifications",
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: "plug",
    articleIds: [
      "kb-api-rate-limit",
      "kb-oauth-token-expired",
      "kb-webhook-signature-failed",
      "kb-api-key-rotation",
      "kb-webhook-retry-policy",
      "kb-domain-verification-stuck",
      "kb-zapier-connection-stale",
    ],
  },
  {
    id: "account-management",
    label: "Account Management",
    icon: "users",
    articleIds: [
      "kb-transfer-workspace-ownership",
      "kb-audit-log-access",
      "kb-remove-member-deactivate",
      "kb-merge-workspaces",
      "kb-export-audit-log",
      "kb-manage-notification-preferences",
    ],
  },
]

export function getKnowledgeArticleExplorerGroups(
  articles = knowledgeArticles,
  groups = knowledgeArticleExplorerGroups
): KnowledgeArticleResolvedGroup[] {
  const articleById = new Map(articles.map((article) => [article.id, article]))

  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    icon: group.icon,
    defaultOpen: group.defaultOpen ?? false,
    articles: group.articleIds
      .flatMap((articleId) => {
        const article = articleById.get(articleId)
        return article && !article.archivedAt ? [article] : []
      })
      .sort((firstArticle, secondArticle) => {
        if (firstArticle.isPinned === secondArticle.isPinned) return 0
        return firstArticle.isPinned ? -1 : 1
      }),
  }))
}

export function getKnowledgeArticleById(
  articleId: string | null,
  articles = knowledgeArticles
) {
  if (!articleId) return null
  return articles.find((article) => article.id === articleId) ?? null
}

export function getSuggestedKnowledgeArticles(
  ticket: Ticket,
  articles = knowledgeArticles
) {
  const searchableText = [
    ticket.subject,
    ticket.category,
    ticket.ticketType,
    ...(ticket.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  const scoredArticles = articles
    .map((article) => {
      const categoryScore = article.category === ticket.category ? 4 : 0
      const reasonScore = article.matchReasons.reduce((score, reason) => {
        return searchableText.includes(reason.toLowerCase()) ? score + 2 : score
      }, 0)
      const returnIntentScore = /wrong|return|swap|exchange|order|product/.test(
        searchableText
      )
        ? categoryFallbackOrder.includes(article.id)
          ? 3
          : 0
        : 0

      return {
        article,
        score: categoryScore + reasonScore + returnIntentScore,
      }
    })
    .sort((first, second) => {
      if (second.score !== first.score) return second.score - first.score
      return second.article.helpfulRate - first.article.helpfulRate
    })

  return scoredArticles.slice(0, 3).map(({ article }) => article)
}
