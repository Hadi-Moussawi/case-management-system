'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  FileText,
  Users,
  Zap,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground antialiased'>
      {/* Header - Modern glass morphism effect */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className='sticky top-0 z-50 w-full border-b border-primary/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30'
      >
        <div className='container flex h-16 items-center px-4 md:px-6'>
          <div className='mr-4 flex items-center'>
            <Link href='/' className='mr-6 flex items-center space-x-2'>
              {/* Modern logo with glowing effect */}
              <div className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-8 w-8 text-primary'
                >
                  <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                  <polyline points='14 2 14 8 20 8' />
                  <path d='m10 14 2 2 4-4' />
                  <path d='M8 18h1.93a2 2 0 0 0 1.66-.9l.82-1.2a2 2 0 0 1 1.66-.9H16' />
                </svg>
                <div className='absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-lg'></div>
              </div>
              <span className='hidden font-bold text-xl tracking-tight sm:inline-block'>
                CaseFlow
              </span>
            </Link>
            <nav className='hidden md:flex items-center space-x-8 text-sm font-medium'>
              <Link
                href='#features'
                className='flex items-center space-x-1 transition-colors hover:text-primary text-foreground/80'
              >
                <span>Features</span>
              </Link>
              <Link
                href='#benefits'
                className='flex items-center space-x-1 transition-colors hover:text-primary text-foreground/80'
              >
                <span>Benefits</span>
              </Link>
              <Link
                href='#cta'
                className='flex items-center space-x-1 transition-colors hover:text-primary text-foreground/80'
              >
                <span>Get Started</span>
              </Link>
            </nav>
          </div>
          <div className='flex flex-1 items-center justify-end space-x-3 md:space-x-4'>
            <Button variant='ghost' size='sm' asChild className='font-medium'>
              <Link href='/login'>Login</Link>
            </Button>
            <Button
              size='sm'
              asChild
              className='font-medium relative overflow-hidden group'
            >
              <Link href='/signup' className='flex items-center gap-1'>
                Sign Up
                <ArrowRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1' />
                <span className='absolute inset-0 -z-10 bg-gradient-to-r from-primary/80 to-primary opacity-0 blur transition-opacity group-hover:opacity-25'></span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className='flex-grow'>
        {/* Hero Section - Enhanced with better gradient and animation */}
        <motion.section
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          className='container relative flex flex-col items-center justify-center gap-8 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32 text-center'
        >
          {/* Background elements */}
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl'></div>
            <div className='absolute -bottom-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl'></div>
          </div>

          <div className='inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-2'>
            Next-Gen Legal Management
          </div>

          <motion.h1
            variants={fadeIn}
            className='text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/90 to-secondary leading-tight max-w-[950px]'
          >
            Streamline Your Case Management Workflow
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className='max-w-[750px] text-lg text-foreground/70 md:text-xl leading-relaxed'
          >
            CaseFlow provides an intuitive and powerful platform to manage your
            cases efficiently, collaborate seamlessly, and achieve better
            outcomes for your clients.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
            className='flex flex-col sm:flex-row items-center gap-4 mt-4'
          >
            <motion.div variants={scaleIn}>
              <Button
                size='lg'
                asChild
                className='relative group overflow-hidden'
              >
                <Link
                  href='/signup'
                  className='flex items-center gap-2 pl-4 pr-5 py-6'
                >
                  Get Started for Free
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                  <span className='absolute inset-0 -z-10 bg-gradient-to-r from-primary/80 to-primary opacity-0 blur transition-opacity group-hover:opacity-25'></span>
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Button
                size='lg'
                variant='outline'
                asChild
                className='border-primary/20 hover:border-primary/50'
              >
                <Link href='#features' className='flex items-center gap-2'>
                  Learn More
                  <ArrowDown className='h-4 w-4 animate-bounce' />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted by section */}
          <motion.div
            variants={fadeIn}
            className='mt-16 pt-8 border-t border-primary/10 w-full max-w-4xl'
          >
            <p className='text-sm text-foreground/50 mb-6'>
              Trusted by legal professionals from
            </p>
            <div className='flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70'>
              {[
                'Anderson & Partners',
                'Legal Solutions LLC',
                'Justice Associates',
                'Wellington Law Firm',
              ].map((firm) => (
                <div key={firm} className='text-foreground/60 font-medium'>
                  {firm}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section - Modern card design */}
        <motion.section
          id='features'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='w-full py-24 md:py-32 bg-gradient-to-b from-background to-muted/20 relative'
        >
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute top-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl'></div>
            <div className='absolute bottom-[10%] left-[5%] h-[250px] w-[250px] rounded-full bg-secondary/5 blur-3xl'></div>
          </div>

          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-16'>
              <motion.div variants={fadeIn} className='space-y-4 max-w-[800px]'>
                <div className='inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
                  Key Features
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Everything You Need, All in One Place
                </h2>
                <p className='text-muted-foreground md:text-lg/relaxed'>
                  CaseFlow is packed with features designed to simplify your
                  workflow, enhance collaboration, and boost productivity.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              className='mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3'
            >
              {/* Feature Cards - Modern glass cards with hover effect */}
              <motion.div
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className='group flex flex-col gap-4 p-6 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300'
              >
                <div className='rounded-lg bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors'>
                  <Zap className='h-7 w-7 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>Centralized Dashboard</h3>
                <p className='text-foreground/70'>
                  Get a complete overview of all your cases, tasks, and
                  deadlines in one place.
                </p>
              </motion.div>

              <motion.div
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className='group flex flex-col gap-4 p-6 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300'
              >
                <div className='rounded-lg bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors'>
                  <FileText className='h-7 w-7 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>Document Management</h3>
                <p className='text-foreground/70'>
                  Securely store, organize, and access all case-related
                  documents anytime, anywhere.
                </p>
              </motion.div>

              <motion.div
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className='group flex flex-col gap-4 p-6 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300'
              >
                <div className='rounded-lg bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors'>
                  <Users className='h-7 w-7 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>Team Collaboration</h3>
                <p className='text-foreground/70'>
                  Communicate with team members, assign tasks, and track
                  progress in real-time.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section - Improved layout and visuals */}
        <motion.section
          id='benefits'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='w-full py-24 md:py-32 relative'
        >
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute top-[30%] left-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl'></div>
          </div>

          <div className='container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16'>
            <motion.div variants={fadeIn} className='space-y-6'>
              <div className='inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
                Why CaseFlow?
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Unlock Efficiency and Collaboration
              </h2>
              <p className='text-foreground/70 md:text-lg leading-relaxed max-w-[600px]'>
                Move beyond scattered spreadsheets and emails. CaseFlow brings
                structure, clarity, and efficiency to your case management
                process.
              </p>
              <ul className='grid gap-5 py-2'>
                <motion.li
                  variants={scaleIn}
                  className='flex items-start gap-4 p-4 rounded-lg border border-primary/10 bg-background/50 backdrop-blur-sm'
                >
                  <div className='rounded-lg bg-primary/10 p-2 mt-1'>
                    <CheckCircle className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg'>
                      Increased Productivity
                    </h4>
                    <p className='text-foreground/70 mt-1'>
                      Automate repetitive tasks and focus on high-value work
                      that matters to your clients.
                    </p>
                  </div>
                </motion.li>
                <motion.li
                  variants={scaleIn}
                  className='flex items-start gap-4 p-4 rounded-lg border border-primary/10 bg-background/50 backdrop-blur-sm'
                >
                  <div className='rounded-lg bg-primary/10 p-2 mt-1'>
                    <CheckCircle className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg'>
                      Improved Collaboration
                    </h4>
                    <p className='text-foreground/70 mt-1'>
                      Keep everyone on the same page with centralized
                      communication and document sharing.
                    </p>
                  </div>
                </motion.li>
                <motion.li
                  variants={scaleIn}
                  className='flex items-start gap-4 p-4 rounded-lg border border-primary/10 bg-background/50 backdrop-blur-sm'
                >
                  <div className='rounded-lg bg-primary/10 p-2 mt-1'>
                    <CheckCircle className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg'>Enhanced Security</h4>
                    <p className='text-foreground/70 mt-1'>
                      Protect sensitive case data with robust security measures
                      and role-based access control.
                    </p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className='relative flex justify-center order-first lg:order-last'
            >
              {/* Modern dashboard mockup */}
              <div className='w-full max-w-md aspect-[4/3] rounded-xl bg-gradient-to-br from-background to-muted border border-primary/20 shadow-xl p-1'>
                <div className='rounded-lg h-full bg-background p-4 overflow-hidden'>
                  <div className='h-8 flex items-center space-x-2 mb-4'>
                    <div className='h-3 w-3 rounded-full bg-red-400'></div>
                    <div className='h-3 w-3 rounded-full bg-yellow-400'></div>
                    <div className='h-3 w-3 rounded-full bg-green-400'></div>
                    <div className='w-[80%] h-5 rounded-md bg-muted ml-4'></div>
                  </div>
                  <div className='flex space-x-4'>
                    <div className='w-1/3 space-y-3'>
                      <div className='h-8 w-full rounded-md bg-primary/10'></div>
                      <div className='h-24 w-full rounded-md bg-muted'></div>
                      <div className='h-32 w-full rounded-md bg-muted'></div>
                    </div>
                    <div className='w-2/3 space-y-3'>
                      <div className='h-12 w-full rounded-md bg-muted'></div>
                      <div className='h-64 w-full rounded-md bg-muted'></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className='absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl -z-10'></div>
              <div className='absolute -top-6 -left-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl -z-10'></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section - Modern gradient */}
        <motion.section
          id='cta'
          variants={fadeIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          className='w-full py-24 md:py-32 relative bg-gradient-to-t from-primary/5 to-background'
        >
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT)/5%,transparent_70%)]'></div>
          </div>

          <motion.div
            variants={scaleIn}
            className='container mx-auto max-w-3xl rounded-3xl border border-primary/10 bg-background/80 backdrop-blur-md p-12 md:p-14 shadow-lg'
          >
            <div className='flex flex-col items-center justify-center gap-6 text-center'>
              <div className='inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground/70'>
                Ready to Get Started?
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground/90'>
                Transform Your Legal Workflow Today
              </h2>
              <p className='max-w-[600px] text-foreground/60 md:text-lg'>
                Sign up today for a free trial and experience the power of
                streamlined case management with CaseFlow.
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-lg'>
                <Button
                  size='lg'
                  asChild
                  className='h-14 text-base px-6 bg-slate-900 hover:bg-slate-800 text-white'
                >
                  <Link
                    href='/signup'
                    className='flex items-center justify-center gap-2'
                  >
                    Start Free Trial
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  asChild
                  className='h-14 text-base px-6 border-slate-200 hover:bg-slate-50 text-slate-800'
                >
                  <Link href='/contact'>Request a Demo</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer - Modern design */}
      <footer className='py-12 border-t border-primary/10 bg-background/50 backdrop-blur-sm'>
        <div className='container flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-6'>
          <div className='flex flex-col items-center md:items-start gap-2'>
            <div className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6 text-primary'
              >
                <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                <polyline points='14 2 14 8 20 8' />
                <path d='m10 14 2 2 4-4' />
                <path d='M8 18h1.93a2 2 0 0 0 1.66-.9l.82-1.2a2 2 0 0 1 1.66-.9H16' />
              </svg>
              <span className='font-bold'>CaseFlow</span>
            </div>
            <p className='text-sm text-foreground/60'>
              © {new Date().getFullYear()} CaseFlow. All rights reserved.
            </p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <nav className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
              <Link
                href='/features'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                Features
              </Link>
              <Link
                href='/pricing'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                Pricing
              </Link>
              <Link
                href='/about'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                About Us
              </Link>
              <Link
                href='/blog'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                Blog
              </Link>
              <Link
                href='/privacy'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                Privacy
              </Link>
              <Link
                href='/terms'
                className='text-sm text-foreground/70 hover:text-primary transition-colors'
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
