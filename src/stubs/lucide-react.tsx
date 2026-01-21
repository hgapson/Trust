import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

function createIcon(paths: React.ReactNode) {
  return React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { strokeWidth = 2, ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {paths}
      </svg>
    );
  });
}

const circleIcon = createIcon(<circle cx="12" cy="12" r="9" />);

const Menu = createIcon(
  <>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </>,
);

const Facebook = circleIcon;
const Twitter = circleIcon;
const Linkedin = circleIcon;
const Link = createIcon(
  <>
    <path d="M15 7h3a5 5 0 0 1 0 10h-3" />
    <path d="M9 17H6a5 5 0 0 1 0-10h3" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </>,
);
const Layers = createIcon(
  <>
    <path d="M12 3 2 9l10 6 10-6-10-6Z" />
    <path d="M2 15l10 6 10-6" />
  </>
);
const LayoutDashboard = createIcon(
  <>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="6" rx="1" />
    <rect x="13" y="11" width="8" height="10" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
  </>
);
const ListChecks = createIcon(
  <>
    <line x1="10" y1="6" x2="20" y2="6" />
    <line x1="10" y1="12" x2="20" y2="12" />
    <line x1="10" y1="18" x2="20" y2="18" />
    <polyline points="3 6 4.5 7.5 7 5" />
    <polyline points="3 12 4.5 13.5 7 11" />
    <polyline points="3 18 4.5 19.5 7 17" />
  </>
);
const Mail = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </>,
);
const Shield = createIcon(
  <>
    <path d="M12 3 5 5v6c0 5.55 3.84 10.74 7 11 3.16-.26 7-5.45 7-11V5Z" />
  </>,
);
const Award = createIcon(
  <>
    <circle cx="12" cy="8" r="5" />
    <path d="M15.5 11.5 18 16l-3 2-3-2-3 2-3-2 2.5-4.5" />
  </>,
);
const CheckCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
const ClipboardList = createIcon(
  <>
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="15" y2="16" />
  </>
);
const CheckIcon = createIcon(<path d="m5 12 5 5 9-9" />);
const Users = createIcon(
  <>
    <circle cx="9" cy="7" r="4" />
    <circle cx="17" cy="11" r="3" />
    <path d="M5 21v-2a4 4 0 0 1 4-4h2" />
    <path d="M16 21v-2a3 3 0 0 0-3-3h-1" />
  </>,
);
const Heart = createIcon(
  <>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  </>,
);
const HelpCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-2 2-2 4" />
    <circle cx="12" cy="17" r="0.9" />
  </>,
);
const Wrench = createIcon(
  <>
    <path d="m5.7 13.3 3.5 3.5" />
    <path d="M2 22l4-4" />
    <path d="M14.7 6.3a5 5 0 1 1-3 3L4 1l7.3 7.3Z" />
  </>,
);
const Target = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </>,
);
const ArrowRight = createIcon(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>,
);
const Phone = createIcon(
  <>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.4 12.4 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 9a16 16 0 0 0 7 7l.36-.27a2 2 0 0 1 2.11-.45 12.4 12.4 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </>,
);
const MapPin = createIcon(
  <>
    <path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
    <circle cx="12" cy="11" r="3" />
  </>,
);
const Clock = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 16 14" />
  </>,
);
const Globe = circleIcon;
const Briefcase = createIcon(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M12 7V5a2 2 0 0 0-2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </>,
);
const GraduationCap = createIcon(
  <>
    <path d="M2 8 12 3l10 5-10 5-10-5Z" />
    <path d="M12 13v8" />
    <path d="m5 11-1 0a4 4 0 0 0 7 3.5" />
  </>,
);
const Home = createIcon(
  <>
    <path d="M3 10 12 3l9 7" />
    <path d="M5 12v8h4v-6h6v6h4v-8" />
  </>,
);
const UserCheck = createIcon(
  <>
    <circle cx="8" cy="8" r="4" />
    <path d="M2 21v-1a5 5 0 0 1 5-5h2" />
    <polyline points="16 11 18 13 22 9" />
  </>,
);
const FileText = createIcon(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="9" y2="9" />
  </>,
);
const Rocket = createIcon(
  <>
    <path d="M4.05 11A8 8 0 0 1 13 2l7 7a8 8 0 0 1-9 9L4 11.05" />
    <path d="M5.5 15.5 9 18" />
    <path d="m15 9-6 6" />
  </>,
);
const Trash2 = createIcon(
  <>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M6 6l1 14h10l1-14" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </>,
);
const Quote = createIcon(
  <>
    <path d="M5 11c0-3 2-5 4-5v4a4 4 0 1 1-4 4" />
    <path d="M15 11c0-3 2-5 4-5v4a4 4 0 1 1-4 4" />
  </>,
);
const RefreshCw = createIcon(
  <>
    <path d="M21 12a9 9 0 1 1-3.1-6.7" />
    <polyline points="21 3 21 9 15 9" />
  </>,
);
const DollarSign = createIcon(
  <>
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 7a5 5 0 0 0-5-5 5 5 0 0 0 0 10" />
    <path d="M7 17a5 5 0 0 0 5 5 5 5 0 0 0 0-10" />
  </>,
);
const Building = createIcon(
  <>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </>,
);
const Calendar = createIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>,
);
const CalendarDays = Calendar;
const Gift = createIcon(
  <>
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M3 12h18" />
    <path d="M12 8v13" />
    <path d="M7.5 5.5a2.5 2.5 0 0 1 5 0A2.5 2.5 0 0 1 12 8H7a2 2 0 0 1 .5-2.5Z" />
    <path d="M16.5 5.5a2.5 2.5 0 0 0-5 0A2.5 2.5 0 0 0 12 8h5a2 2 0 0 0-.5-2.5Z" />
  </>,
);
const Handshake = createIcon(
  <>
    <path d="M4 14 2 12l4-4 6 6" />
    <path d="m20 7-6 6 3 3 5-5Z" />
    <path d="m8 13 3 3a3 3 0 0 0 4.24 0L19 12" />
  </>,
);
const HandHeart = createIcon(
  <>
    <path d="M12 21s-6-4.35-8.4-7.2a5 5 0 1 1 7.2-6.6L12 8l1.2-0.8a5 5 0 1 1 7.2 6.6C18 16.65 12 21 12 21Z" />
    <path d="M4 14c2 2 4 3 8 3s6-1 8-3" />
  </>
);
const Star = createIcon(
  <>
    <polygon points="12 3 14.6 9.1 21 9.7 16 14 17.5 21 12 17.8 6.5 21 8 14 3 9.7 9.4 9.1 12 3" />
  </>,
);
const MessageSquare = createIcon(
  <>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </>,
);
const Car = createIcon(
  <>
    <path d="M5 16l1.5-3h11L19 16" />
    <path d="M3 16v2h2" />
    <path d="M19 16v2h2" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M5 16V9l2-4h10l2 4v7" />
  </>,
);
const Accessibility = circleIcon;
const BookOpen = createIcon(
  <>
    <path d="M3 4h7a2 2 0 0 1 2 2v14H5a2 2 0 0 1-2-2Z" />
    <path d="M21 4h-7a2 2 0 0 0-2 2v14h7a2 2 0 0 0 2-2Z" />
  </>,
);
const ArrowLeft = createIcon(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </>,
);
const ArrowLeftIcon = ArrowLeft;
const ArrowRightIcon = ArrowRight;
const ChevronDownIcon = createIcon(
  <>
    <polyline points="6 9 12 15 18 9" />
  </>,
);
const ChevronRightIcon = createIcon(
  <>
    <polyline points="9 6 15 12 9 18" />
  </>,
);
const ChevronDown = ChevronDownIcon;
const ChevronLeft = ArrowLeft;
const ChevronRight = ArrowRight;
const ChevronLeftIcon = ArrowLeft;
const ChevronUpIcon = createIcon(
  <>
    <polyline points="6 15 12 9 18 15" />
  </>,
);
const CircleIcon = circleIcon;
const GripVerticalIcon = createIcon(
  <>
    <circle cx="9" cy="5" r="1.5" />
    <circle cx="15" cy="5" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="19" r="1.5" />
    <circle cx="15" cy="19" r="1.5" />
  </>,
);
const MoreHorizontal = createIcon(
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </>,
);
const MoreHorizontalIcon = MoreHorizontal;
const MinusIcon = createIcon(<line x1="5" y1="12" x2="19" y2="12" />);
const PanelLeftIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="9" y1="4" x2="9" y2="20" />
  </>,
);
const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="6" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>,
);
const XIcon = createIcon(
  <>
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </>,
);

export {
  Accessibility,
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  Award,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CalendarDays,
  Car,
  ChevronDown,
  CheckCircle,
  CheckIcon,
  ClipboardList,
  ChevronDownIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon,
  Clock,
  DollarSign,
  Facebook,
  FileText,
  Gift,
  Globe,
  GraduationCap,
  GripVerticalIcon,
  Handshake,
  HandHeart,
  Heart,
  HelpCircle,
  Home,
  Link,
  Layers,
  LayoutDashboard,
  ListChecks,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MinusIcon,
  MoreHorizontal,
  MoreHorizontalIcon,
  PanelLeftIcon,
  Phone,
  Quote,
  RefreshCw,
  Rocket,
  SearchIcon,
  Shield,
  Star,
  Target,
  Twitter,
  Trash2,
  UserCheck,
  Users,
  Wrench,
  XIcon,
};
