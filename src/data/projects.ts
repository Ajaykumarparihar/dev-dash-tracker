
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    name: 'ProjectPilot',
    description: 'A minimal project tracker for solo developers and indie hackers.',
    status: 'in-progress',
    startDate: '2023-07-15',
    githubUrl: 'https://github.com/username/projectpilot',
    deploymentUrl: 'https://projectpilot.vercel.app',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    tasks: [
      {
        id: '101',
        title: 'Design UI mockups',
        description: 'Create mockups for dashboard, project details, and calendar views',
        status: 'completed',
        createdAt: '2023-07-15',
        updatedAt: '2023-07-18'
      },
      {
        id: '102',
        title: 'Set up Supabase Auth',
        description: 'Implement email & password authentication with Supabase',
        status: 'in-progress',
        dueDate: '2023-08-10',
        createdAt: '2023-07-19',
        updatedAt: '2023-07-25'
      },
      {
        id: '103',
        title: 'Build dashboard view',
        description: 'Implement dashboard with project cards',
        status: 'todo',
        dueDate: '2023-08-15',
        createdAt: '2023-07-19',
        updatedAt: '2023-07-19'
      }
    ],
    createdAt: '2023-07-15',
    updatedAt: '2023-07-25'
  },
  {
    id: '2',
    name: 'HealthTracker API',
    description: 'Backend API for a health and fitness tracking mobile app.',
    status: 'planning',
    startDate: '2023-08-01',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    tasks: [
      {
        id: '201',
        title: 'Define API endpoints',
        description: 'Document all required endpoints and data structures',
        status: 'in-progress',
        dueDate: '2023-08-10',
        createdAt: '2023-08-01',
        updatedAt: '2023-08-03'
      },
      {
        id: '202',
        title: 'Set up MongoDB schema',
        description: 'Design and implement MongoDB schema for user data',
        status: 'todo',
        dueDate: '2023-08-15',
        createdAt: '2023-08-01',
        updatedAt: '2023-08-01'
      }
    ],
    createdAt: '2023-08-01',
    updatedAt: '2023-08-03'
  },
  {
    id: '3',
    name: 'Portfolio Website',
    description: 'Personal developer portfolio showcasing projects and skills.',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    githubUrl: 'https://github.com/username/portfolio',
    deploymentUrl: 'https://myportfolio.dev',
    technologies: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
    tasks: [
      {
        id: '301',
        title: 'Design layout',
        status: 'completed',
        createdAt: '2023-06-01',
        updatedAt: '2023-06-05'
      },
      {
        id: '302',
        title: 'Implement animations',
        status: 'completed',
        createdAt: '2023-06-06',
        updatedAt: '2023-06-15'
      },
      {
        id: '303',
        title: 'Deploy to production',
        status: 'completed',
        createdAt: '2023-06-25',
        updatedAt: '2023-06-30'
      }
    ],
    createdAt: '2023-06-01',
    updatedAt: '2023-06-30'
  },
  {
    id: '4',
    name: 'E-commerce Marketplace',
    description: 'A marketplace connecting local artisans with customers.',
    status: 'on-hold',
    startDate: '2023-05-01',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    tasks: [
      {
        id: '401',
        title: 'Design user flows',
        status: 'completed',
        createdAt: '2023-05-01',
        updatedAt: '2023-05-10'
      },
      {
        id: '402',
        title: 'Implement payment processing',
        status: 'in-progress',
        createdAt: '2023-05-15',
        updatedAt: '2023-05-25'
      }
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-05-25'
  }
];
