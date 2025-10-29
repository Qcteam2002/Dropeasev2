# 🎨 Pricing Page - Visual Design Guide

## 📐 Layout Architecture

### Desktop Layout (1400px container)

```
╔══════════════════════════════════════════════════════════════════╗
║                         PRICING PLANS                            ║
║    Transform products into high-converting pages with AI         ║
║                                                                  ║
║   ✅ AI content  ✅ Segmentation  ✅ 1-click sync                ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ┌─────────┐  ┌─────────┐  ┌───────────────┐  ┌─────────┐     ║
║  │  FREE   │  │ STARTER │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │BUSINESS │     ║
║  │         │  │         │  │ ▓ GRADIENT ▓ │  │         │     ║
║  │   $0    │  │   $9    │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ $49.9   │     ║
║  │  /month │  │  /month │  │               │  │ /month  │     ║
║  │         │  │         │  │  PRO  [⭐]    │  │         │     ║
║  │ [Start] │  │[Upgrade]│  │    $19.9      │  │[Contact]│     ║
║  │  Free   │  │   Now   │  │   /month      │  │  Sales  │     ║
║  │         │  │         │  │               │  │         │     ║
║  │ ✅ 10p  │  │ ✅ 50p  │  │  [Choose Pro] │  │ ✅ 1000p│     ║
║  │ ✅ 20ai │  │ ✅ 100ai│  │               │  │ ✅ ∞ ai │     ║
║  │ 🔒 AI   │  │ 👁 AI   │  │ ✅ 250p       │  │ ✅ ∞    │     ║
║  │   Seg   │  │   Seg   │  │ ✅ 500ai      │  │ ✅ Bulk │     ║
║  │         │  │(preview)│  │ ✅ AI Seg     │  │   Opt   │     ║
║  └─────────┘  └─────────┘  └───────────────┘  └─────────┘     ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                  COMPARE ALL FEATURES                            ║
║                                                                  ║
║  ┌────────────────────────────────────────────────────────────┐ ║
║  │ Basic Limits          Free  Starter  Pro    Business       │ ║
║  ├────────────────────────────────────────────────────────────┤ ║
║  │ Products managed       10     50     250     1,000         │ ║
║  │ AI generations/mo      20    100     500      ∞            │ ║
║  │ Segment discovery/mo   10     50     200      ∞            │ ║
║  ├────────────────────────────────────────────────────────────┤ ║
║  │ Core Features                                              │ ║
║  ├────────────────────────────────────────────────────────────┤ ║
║  │ Manual settings        ✅     ✅     ✅      ✅            │ ║
║  │ AI Segmentation        🔒    👁️     ✅      ✅            │ ║
║  │ Select segments        🔒     🔒     ✅      ✅            │ ║
║  ├────────────────────────────────────────────────────────────┤ ║
║  │ Optimization & Sync                                        │ ║
║  ├────────────────────────────────────────────────────────────┤ ║
║  │ Bulk Optimization      🔒     🔒     🔒      ✅            │ ║
║  │ 1-click sync           ✅     ✅     ✅      ✅            │ ║
║  └────────────────────────────────────────────────────────────┘ ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║              CHOOSE YOUR GROWTH PATH                             ║
║                                                                  ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐                      ║
║  │Free→Start│  │Start→Pro │  │Pro→Biz   │                      ║
║  │Need more │  │Stop guess│  │Need bulk │                      ║
║  │products  │  │Target AI │  │operations│                      ║
║  └──────────┘  └──────────┘  └──────────┘                      ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 🎨 Color Palette

### Primary Colors
```
┌─────────────────────────────────────────────────┐
│ Success Green (✅)   : #008060 (Polaris Success) │
│ Subdued Gray (🔒)    : #6D7175 (Polaris Subdued) │
│ Primary Action       : #008060 (Polaris Primary) │
│ Text Primary         : #202223 (Polaris Text)    │
│ Text Subdued         : #6D7175 (Polaris Subdued) │
└─────────────────────────────────────────────────┘
```

### Pro Plan Gradient
```
╔═══════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓  GRADIENT BAR (4px height)  ▓ ║
║ ▓  #8B5CF6 → #00D9FF (135deg) ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚═══════════════════════════════════╝
    Purple         →        Cyan
   (Premium)              (Tech)
```

---

## 📏 Spacing System

### Polaris Spacing Tokens
```
╔══════════════════════════════════════╗
║ Token      Size    Usage             ║
╠══════════════════════════════════════╣
║ 100        4px     Tight grouping    ║
║ 200        8px     Related items     ║
║ 300        12px    Component spacing ║
║ 400        16px    Section spacing   ║
║ 500        20px    Card padding      ║
║ 600        24px    Large spacing     ║
║ 800        32px    Section breaks    ║
╚══════════════════════════════════════╝
```

### Card Internal Spacing
```
┌─────────────────────────────┐
│ ← 20px padding (500)        │
│                             │
│  Plan Name                  │
│  ↕ 8px gap (200)            │
│  Description                │
│  ↕ 16px gap (400)           │
│  $19.9 / month              │
│  ↕ 16px gap (400)           │
│  [  CTA Button  ]           │
│  ↕ 16px gap (400)           │
│  ───────────────            │
│  ↕ 16px gap (400)           │
│  Key features:              │
│  ✅ Feature 1               │
│  ↕ 8px gap (200)            │
│  ✅ Feature 2               │
│                             │
│ ← 20px padding (500)        │
└─────────────────────────────┘
```

---

## 🔤 Typography Hierarchy

### Text Variants & Usage
```
╔══════════════════════════════════════════════════╗
║ Variant        Size   Weight  Usage              ║
╠══════════════════════════════════════════════════╣
║ heading3xl     36px   Bold    Page title         ║
║ heading2xl     28px   Bold    Plan name          ║
║ headingLg      20px   Semibold Section subtitle ║
║ headingMd      16px   Semibold Feature category ║
║ bodyMd         14px   Regular  Feature text     ║
║ bodySm         12px   Regular  Supporting text  ║
╚══════════════════════════════════════════════════╝
```

### Example Hierarchy
```
┌────────────────────────────────┐
│ Pricing Plans                  │ ← heading3xl
│ (36px bold, center)            │
│                                │
│ Transform products into...     │ ← headingLg
│ (20px semibold, center)        │
│                                │
│  Pro                     [⭐]  │ ← heading2xl
│  (28px bold)                   │
│                                │
│  For growing stores...         │ ← bodySm
│  (12px regular, subdued)       │
│                                │
│  $19.9 / month                 │ ← heading3xl + bodyMd
│  (36px bold) (14px subdued)    │
│                                │
│  Key features:                 │ ← bodyMd semibold
│  (14px semibold)               │
│                                │
│  ✅ 250 products managed       │ ← bodySm
│  (12px regular)                │
└────────────────────────────────┘
```

---

## 🎯 Interactive Elements

### Button States

**Primary Button (Pro Plan)**
```
╔════════════════════════╗     ╔════════════════════════╗
║                        ║     ║                        ║
║     Choose Pro         ║ →   ║     Choose Pro         ║
║     (Normal)           ║     ║     (Hover - darker)   ║
╚════════════════════════╝     ╚════════════════════════╝
   Green bg (#008060)            Darker green (#006e52)
```

**Secondary Button (Free, Starter, Business)**
```
╔════════════════════════╗     ╔════════════════════════╗
║                        ║     ║                        ║
║   Start Free           ║ →   ║   Start Free           ║
║   (Normal)             ║     ║   (Hover - gray bg)    ║
╚════════════════════════╝     ╚════════════════════════╝
   White bg, border           Light gray bg (#F3F3F3)
```

### Card Hover States
```
Free/Starter/Business:
┌─────────────┐     ┌─────────────┐
│             │ →   │             │
│   (hover)   │     │  (no change)│
│             │     │             │
└─────────────┘     └─────────────┘
  No transform        No transform

Pro Plan:
┌─────────────┐     ┌─────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓│ →   │▓▓▓▓▓▓▓▓▓▓▓▓▓│
│             │     │             │
│   (hover)   │     │  (subtle    │
│             │     │   lift)     │
└─────────────┘     └─────────────┘
 scale(1.02)         + shadow
```

---

## 📱 Responsive Breakpoints

### Desktop (>1120px)
```
╔═══════════════════════════════════════════════════╗
║  [Free]   [Starter]   [Pro⭐]   [Business]        ║
╚═══════════════════════════════════════════════════╝
         All 4 cards side-by-side
```

### Tablet (840-1119px)
```
╔════════════════════════════════╗
║  [Free]   [Starter]   [Pro⭐]  ║
║         [Business]             ║
╚════════════════════════════════╝
    3 cards wrap to 2 rows
```

### Mobile (560-839px)
```
╔═══════════════╗
║    [Free]     ║
║   [Starter]   ║
║    [Pro⭐]    ║
║  [Business]   ║
╚═══════════════╝
 Vertical stack
```

### Small Mobile (<560px)
```
╔═════════════╗
║   [Free]    ║
║  [Starter]  ║
║   [Pro⭐]   ║
║ [Business]  ║
╚═════════════╝
Full width cards
```

---

## 🔍 Visual Indicators

### Icons & Their Meanings

**Availability Icons**
```
✅  CheckIcon     → Feature available
    (Green, 20px)    Full access granted

🔒  LockIcon      → Feature locked
    (Gray, 20px)     No access

👁️  Text          → Preview only
    (Gray text)      Limited access
```

**Badge Styles**
```
┌─────────────┐
│ ⭐ Most     │  Success tone (green background)
│   Popular   │  Used on Pro plan only
└─────────────┘
```

---

## 🎨 Pro Plan Visual Treatment

### Anatomy of Pro Card

```
┌───────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Gradient (4px)
├───────────────────────────────────┤
│  Pro         [Most Popular] ⭐    │ ← Name + Badge
│  For growing stores...            │ ← Description
│                                   │
│  $19.9 / month                    │ ← Price (large)
│  Unlock AI Segmentation...        │ ← Subtitle
│                                   │
│  ╔═══════════════════════════╗   │
│  ║     Choose Pro            ║   │ ← Primary CTA
│  ╚═══════════════════════════╝   │
│                                   │
│  ─────────────────────────────    │ ← Divider
│                                   │
│  Key features:                    │
│  ✅ 250 products managed          │
│  ✅ 500 AI generations            │
│  ✅ AI Segmentation ⭐            │ ← Highlighted
│  ✅ Priority support              │
│                                   │
└───────────────────────────────────┘
     Scale: 1.02x (subtle lift)
     Background: Secondary (light gray)
```

### Gradient Specification
```
Direction: 135deg (diagonal)
Colors:
  Start: #8B5CF6 (Purple - 0%)
  End:   #00D9FF (Cyan - 100%)

Visual Effect:
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Purple → Purple-Cyan → Cyan
```

---

## 📊 Comparison Table Layout

### Desktop Grid Structure
```
╔══════════════════════════════════════════════════════════╗
║ Feature Name (40%)    | Free | Starter | Pro | Business ║
║                       |(15%)  | (15%)   |(15%)| (15%)   ║
╠══════════════════════════════════════════════════════════╣
║ Products managed      │  10  │   50    │ 250 │  1,000  ║
║ AI generations/mo     │  20  │  100    │ 500 │    ∞    ║
║ AI Segmentation       │  🔒  │   👁️    │  ✅ │    ✅   ║
╚══════════════════════════════════════════════════════════╝
```

### Mobile Grid Structure
```
┌────────────────────────────────┐
│ Feature | F | S | P | B        │
├────────────────────────────────┤
│ Products│10 │50 │250│1000      │
│ AI Gen  │20 │100│500│ ∞        │
│ AI Seg  │🔒 │👁️ │✅ │✅        │
└────────────────────────────────┘
  Horizontal scroll enabled
```

---

## 🎭 Visual Hierarchy Flow

### Eye Movement Path
```
┌─────────────────────────────────┐
│        1. PAGE TITLE            │ ← First focus
│        (Pricing Plans)          │
├─────────────────────────────────┤
│     2. VALUE PROPOSITION        │
│  (Transform products with AI)   │
├─────────────────────────────────┤
│  3. BENEFITS CHECKLIST          │
│  ✅ ✅ ✅                        │
├─────────────────────────────────┤
│           4. PRO CARD           │ ← Main attention
│       ▓▓▓ GRADIENT ▓▓▓          │   (highlighted)
│        [Most Popular]           │
├─────────────────────────────────┤
│  5. OTHER PLAN CARDS            │ ← Secondary scan
│  [Free] [Starter] [Business]   │
├─────────────────────────────────┤
│  6. COMPARISON TABLE            │ ← Detail seekers
│  (For those who need more info) │
├─────────────────────────────────┤
│  7. UPGRADE FUNNEL              │ ← Decision support
│  (When should I upgrade?)       │
└─────────────────────────────────┘
```

---

## 🖼️ Component Composition

### Hero Section
```
┌─────────────────────────────────────┐
│          [Logo Area]                │
│                                     │
│  Heading3xl (Bold, Center)          │
│  "Pricing Plans"                    │
│                                     │
│  HeadingLg (Subdued, Center)        │
│  "Transform products into..."       │
│                                     │
│  [✅ Benefit] [✅ Benefit] [✅]     │
│  (InlineStack, wrapped)             │
└─────────────────────────────────────┘
     Padding: 32px top/bottom
```

### Card Component
```
┌─────────────────────────────────┐
│  [Gradient Bar if highlighted]  │
├─────────────────────────────────┤
│  BlockStack (gap: 16px)         │
│  │                              │
│  ├─ Plan Header                 │
│  │  └─ InlineStack              │
│  │     ├─ Name (heading2xl)     │
│  │     └─ Badge (if exists)     │
│  │                              │
│  ├─ Description (bodySm)        │
│  │                              │
│  ├─ Pricing Block               │
│  │  ├─ Price (heading3xl)       │
│  │  └─ Period (bodyMd)          │
│  │                              │
│  ├─ CTA Button (large)          │
│  │                              │
│  ├─ Divider                     │
│  │                              │
│  └─ Features List               │
│     └─ BlockStack (gap: 8px)    │
│        ├─ [Icon] Feature 1      │
│        ├─ [Icon] Feature 2      │
│        └─ [Icon] Feature 3      │
│                                 │
└─────────────────────────────────┘
```

---

## 🎨 Shadow & Depth

### Elevation System
```
Card Default:
┌─────────────┐
│             │
│   No hover  │  Shadow: 0 1px 0 0 rgba(0,0,0,0.05)
│             │  (Polaris default)
└─────────────┘

Card Hover (Pro only):
┌─────────────┐
│             │
│   Hovering  │  Shadow: 0 4px 8px rgba(0,0,0,0.1)
│             │  Transform: scale(1.02)
└─────────────┘
```

---

## 🔤 Text Content Formatting

### Plan Card Content Structure
```
┌────────────────────────────────┐
│ PRO                [Badge]     │ ← heading2xl + Badge
│ ▔▔▔                            │
│ For growing stores needing     │ ← bodySm subdued
│ insights                       │
│                                │
│ $19.9                          │ ← heading3xl bold
│ ▔▔▔▔▔ / month                  │   + bodyMd subdued
│ Unlock AI Segmentation - The   │ ← bodySm subdued medium
│ game changer                   │
│                                │
│ [ Choose Pro ]                 │ ← Button large
│                                │
│ ───────────────────            │ ← Divider
│                                │
│ Key features:                  │ ← bodyMd semibold
│ ✅ 250 products managed        │ ← bodySm with <strong>
│ ✅ 500 AI generations          │
│ ✅ AI Segmentation             │
│ ✅ Priority support (24h)      │
└────────────────────────────────┘
```

---

## 📐 Grid & Alignment

### Card Grid Specifications
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 20px;
```

**Behavior**:
- Minimum card width: 280px
- Equal width distribution
- Auto-wraps on smaller screens
- 20px gap between cards

### Comparison Table Grid
```css
display: grid;
grid-template-columns: 2fr repeat(4, 1fr);
gap: 16px;
```

**Breakdown**:
- Column 1 (Feature name): 2fr (40%)
- Columns 2-5 (Plan values): 1fr each (15% each)

---

## 🎯 Focal Points

### Primary Focal Point: Pro Card
```
         FREE        STARTER
               ↓
         ┌───────────┐
         │▓▓▓▓▓▓▓▓▓▓▓│
         │    PRO    │ ← Eye drawn here
         │  [BADGE]  │
         └───────────┘
               ↓
           BUSINESS
```

### Secondary Focal Points
```
1. Page Title (top)
2. Pro Card (center)
3. CTA Buttons (on each card)
4. Lock icons (create FOMO)
5. "Unlimited" text (Business plan)
```

---

## 🧩 Component Anatomy Reference

### InlineStack Example
```
┌────────────────────────────────┐
│  [Icon] Text [Icon] Text       │ ← Horizontal layout
│         [Icon] Text            │   with gaps
└────────────────────────────────┘

Props: gap="200", align="center"
```

### BlockStack Example
```
┌────────────────┐
│ Item 1         │ ← Vertical layout
│ ───            │   with gaps
│ Item 2         │
│ ───            │
│ Item 3         │
└────────────────┘

Props: gap="400", align="start"
```

---

## 🎨 Final Visual Summary

### Complete Page Layout
```
╔════════════════════════════════════════════════════════╗
║                    1400px Container                    ║
╠════════════════════════════════════════════════════════╣
║  HERO (32px padding top/bottom)                        ║
║  ├─ Heading3xl: Pricing Plans                          ║
║  ├─ HeadingLg: Value prop                              ║
║  └─ Benefits: ✅ ✅ ✅                                  ║
╠════════════════════════════════════════════════════════╣
║  CARDS (24px padding top/bottom)                       ║
║  ┌───────┐ ┌───────┐ ┌─────────┐ ┌───────┐           ║
║  │ Free  │ │Starter│ │▓▓ Pro ▓▓│ │Business│           ║
║  │  $0   │ │  $9   │ │  $19.9  │ │ $49.9  │           ║
║  └───────┘ └───────┘ └─────────┘ └───────┘           ║
╠════════════════════════════════════════════════════════╣
║  COMPARISON TABLE (32px padding top)                   ║
║  ┌────────────────────────────────────────────┐       ║
║  │ Category 1                                 │       ║
║  │ ├─ Feature 1    10   50   250   1000      │       ║
║  │ ├─ Feature 2    20   100  500   ∞         │       ║
║  │ Category 2                                 │       ║
║  │ ├─ Feature 3    🔒   👁️    ✅    ✅        │       ║
║  └────────────────────────────────────────────┘       ║
╠════════════════════════════════════════════════════════╣
║  UPGRADE FUNNEL (32px padding top)                     ║
║  ┌──────────┐ ┌──────────┐ ┌──────────┐              ║
║  │ Free→    │ │ Starter→ │ │ Pro→     │              ║
║  │ Starter  │ │ Pro      │ │ Business │              ║
║  └──────────┘ └──────────┘ └──────────┘              ║
╠════════════════════════════════════════════════════════╣
║  FOOTER PADDING (60px)                                 ║
╚════════════════════════════════════════════════════════╝
```

---

## 📱 Mobile Visual Layout

```
╔════════════════════╗
║   PRICING PLANS    ║
║   Value prop       ║
║                    ║
║ ✅ Benefit 1       ║
║ ✅ Benefit 2       ║
║ ✅ Benefit 3       ║
╠════════════════════╣
║  ┌──────────────┐  ║
║  │    FREE      │  ║
║  │    $0        │  ║
║  │  [Button]    │  ║
║  └──────────────┘  ║
║  ┌──────────────┐  ║
║  │   STARTER    │  ║
║  │    $9        │  ║
║  │  [Button]    │  ║
║  └──────────────┘  ║
║  ┌──────────────┐  ║
║  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ║
║  │  PRO [⭐]    │  ║
║  │   $19.9      │  ║
║  │  [Button]    │  ║
║  └──────────────┘  ║
║  ┌──────────────┐  ║
║  │  BUSINESS    │  ║
║  │   $49.9      │  ║
║  │  [Button]    │  ║
║  └──────────────┘  ║
╠════════════════════╣
║ COMPARE FEATURES   ║
║ (Scroll →)         ║
╠════════════════════╣
║ UPGRADE FUNNEL     ║
║ (Stacked)          ║
╚════════════════════╝
```

---

## 🎉 Visual Design Checklist

### Card Design ✅
- [x] Gradient header on Pro plan
- [x] Badge on Pro plan
- [x] Scale effect on Pro hover
- [x] Consistent spacing (20px padding)
- [x] Clear typography hierarchy
- [x] Icon usage (checkmark/lock)

### Layout ✅
- [x] Responsive grid (4→3→2→1 columns)
- [x] Centered content (1400px max-width)
- [x] Proper section spacing
- [x] Hero section prominent

### Comparison Table ✅
- [x] Clear categories
- [x] Aligned columns
- [x] Icon indicators
- [x] Border separators

### Colors ✅
- [x] Polaris color system
- [x] Consistent icon colors
- [x] Gradient on Pro only
- [x] Proper contrast ratios

### Typography ✅
- [x] Clear hierarchy
- [x] Consistent sizing
- [x] Proper weights
- [x] Readable line heights

---

**Document Purpose**: Visual reference for designers, developers, and stakeholders  
**Last Updated**: October 28, 2025  
**Status**: ✅ Complete and Production Ready


