import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.REACT_APP_NOTION_TOKEN,
})

const DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE_ID!

export async function POST(request: NextRequest) {
  try {
    console.log('Environment check:');
    console.log('REACT_APP_NOTION_TOKEN exists:', !!process.env.REACT_APP_NOTION_TOKEN);
    console.log('REACT_APP_NOTION_DATABASE_ID exists:', !!process.env.REACT_APP_NOTION_DATABASE_ID);
    
    const { email } = await request.json()
    console.log('Received email:', email);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    console.log('Querying database for existing email...');
    const existingEntries = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Email',
        email: {
          equals: email,
        },
      },
    })
    console.log('Existing entries found:', existingEntries.results.length);

    if (existingEntries.results.length > 0) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Add new subscriber
    console.log('Creating new page in database...');
    await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Email: {
          email: email,
        },
        'Subscribed Date': {
          date: {
            start: new Date().toISOString().split('T')[0],
          },
        },
        // Source: {
        //   rich_text: [
        //     {
        //       text: {
        //         content: 'Website Newsletter',
        //       },
        //     },
        //   ],
        // },
      },
    })
    console.log('Successfully created new subscriber');

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}