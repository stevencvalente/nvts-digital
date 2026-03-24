import * as React from 'npm:react@18.3.1'
/// <reference types="npm:@types/react@18.3.1" />
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "NVTS Digital"

interface ContactNotificationProps {
  name?: string
  email?: string
  pillar?: string
  message?: string
}

const ContactNotificationEmail = ({ name, email, pillar, message }: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {name || 'someone'} via {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Section style={detailsSection}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Pillar of Interest</Text>
          <Text style={value}>{pillar || '—'}</Text>
          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This message was sent via the {SITE_NAME} contact form.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) => `New enquiry from ${data.name || 'a visitor'}`,
  displayName: 'Contact form notification (to owner)',
  to: 'info@nvtsdigital.com',
  previewData: { name: 'Jane Doe', email: 'jane@example.com', pillar: 'AI & Automation', message: 'I would like to discuss a project.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'DM Sans', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#141414', margin: '0 0 24px', fontFamily: "'Clash Display', Arial, sans-serif" }
const detailsSection = { margin: '0 0 24px' }
const label = { fontSize: '12px', fontWeight: '600' as const, color: '#999999', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '16px 0 4px' }
const value = { fontSize: '15px', color: '#333333', lineHeight: '1.5', margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999999', margin: '0' }
