# Polling Station Lookup - Complete Guide

## Overview

The Polling Station Lookup feature provides comprehensive election information including:

✅ **Polling Places** - Election day voting locations with hours and directions  
✅ **Early Voting Sites** - Early voting locations and schedules  
✅ **Ballot Drop-off Locations** - Where to drop off mail-in ballots  
✅ **Contests & Candidates** - All races on your ballot with candidate information  
✅ **Election Officials** - Contact information for local and state election offices

## Features

### 1. Polling Locations

- **Election Day Locations**: Your assigned polling place with address and hours
- **Early Voting Sites**: All early voting locations in your area
- **Drop-off Locations**: Secure ballot drop boxes
- **Google Maps Integration**: One-click directions to any location
- **Hours of Operation**: Detailed voting hours for each location

### 2. Contests & Candidates

- **All Ballot Items**: Every race and referendum you'll vote on
- **Candidate Profiles**: Names, parties, photos, and websites
- **Party Identification**: Color-coded party affiliations
- **Referendum Information**: Full text and details for ballot measures
- **Contest Details**: Office names, districts, and levels

### 3. Election Officials

- **Contact Information**: Phone numbers and email addresses
- **Office Locations**: Physical and mailing addresses
- **Hours of Operation**: When offices are open
- **Useful Links**:
  - Election information websites
  - Voter registration portals
  - Absentee voting information
  - Ballot information

## How to Use

### Step 1: Navigate to Polling Station Page

Visit: `http://localhost:3000/polling-station`

### Step 2: Enter Your Information

Enter either:

- **ZIP Code**: `90210`
- **Full Address**: `1600 Pennsylvania Ave NW, Washington, DC 20500`

### Step 3: View Results in Tabs

**Polling Locations Tab:**

- See your assigned polling place
- Find early voting sites
- Locate ballot drop boxes
- Get directions to any location

**Contests & Candidates Tab:**

- View all races on your ballot
- See candidate information
- Read referendum details
- Access candidate websites

**Election Officials Tab:**

- Find contact information
- Get office addresses
- Access voter resources
- Contact election staff

## API Configuration

### Environment Variable Required

Add to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_CIVIC_API_KEY=your_google_civic_api_key_here
```

### Get Your API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable "Google Civic Information API"
4. Create credentials → API Key
5. Copy the key to your `.env.local` file

### API Endpoint Used

```
https://www.googleapis.com/civicinfo/v2/voterinfo
```

**Parameters:**

- `address`: ZIP code or full address
- `electionId`: Election identifier (2000 for test data)
- `officialOnly`: false (to get all available data)
- `key`: Your API key

## Data Returned

### Election Information

```typescript
{
  id: string;
  name: string;
  electionDay: string;
  ocdDivisionId?: string;
}
```

### Polling Locations

```typescript
{
  address: {
    locationName?: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours?: string;
  notes?: string;
}
```

### Contests

```typescript
{
  type: string;
  office?: string;
  district?: {
    name: string;
    scope: string;
  };
  candidates?: Array<{
    name: string;
    party?: string;
    candidateUrl?: string;
    photoUrl?: string;
  }>;
  referendumTitle?: string;
  referendumText?: string;
}
```

### Election Officials

```typescript
{
  type: string;
  name: string;
  electionInfoUrl?: string;
  electionRegistrationUrl?: string;
  absenteeVotingInfoUrl?: string;
  physicalAddress?: Address;
  electionOfficials?: Array<{
    name?: string;
    title?: string;
    officePhoneNumber?: string;
    emailAddress?: string;
  }>;
}
```

## Features in Detail

### Polling Locations Display

**Information Shown:**

- Location name
- Full address
- Voting hours
- Special notes or instructions
- Google Maps directions link

**Location Types:**

1. **Election Day Polling Places**: Your assigned location
2. **Early Voting Sites**: Multiple locations with extended hours
3. **Drop-off Locations**: Secure ballot drop boxes

### Contests & Candidates Display

**For Each Contest:**

- Contest type (General, Primary, etc.)
- Office being contested
- District information
- All candidates with:
  - Name and photo
  - Party affiliation (color-coded)
  - Campaign website link
  - Contact information

**For Referendums:**

- Title and subtitle
- Full text of the measure
- Additional information links

**Party Color Coding:**

- 🔴 Republican: Red
- 🔵 Democratic: Blue
- 🟣 Independent: Purple
- 🟢 Green Party: Green
- 🟡 Libertarian: Yellow
- ⚪ Other/Unknown: Gray

### Election Officials Display

**Information Provided:**

- Official name and title
- Contact phone numbers
- Email addresses
- Physical office address
- Mailing address
- Hours of operation

**Resource Links:**

- Election information website
- Voter registration portal
- Absentee voting information
- Ballot information
- Voting location finder

## User Interface

### Tabs Navigation

Three main tabs organize information:

1. **📍 Polling Locations**

   - Primary focus on where to vote
   - Maps and directions
   - Hours and accessibility

2. **👥 Contests & Candidates**

   - Ballot preview
   - Candidate research
   - Referendum details

3. **🏛️ Election Officials**
   - Contact resources
   - Voter assistance
   - Registration help

### Responsive Design

- **Desktop**: Full three-column layouts
- **Tablet**: Two-column grids
- **Mobile**: Single column, stacked cards

### Dark Mode Support

- Automatic theme detection
- Optimized colors for both modes
- Consistent readability

## Example Searches

### Test ZIP Codes

Try these to see different data:

- **10001** - New York City
- **90210** - Beverly Hills
- **20500** - Washington, DC
- **60601** - Chicago
- **94102** - San Francisco

### Test Addresses

Full addresses provide more accurate results:

- `1600 Pennsylvania Ave NW, Washington, DC 20500`
- `350 5th Ave, New York, NY 10118`
- `1 Infinite Loop, Cupertino, CA 95014`

## Troubleshooting

### "API key is not configured"

**Solution:**

- Create `.env.local` in project root
- Add `NEXT_PUBLIC_GOOGLE_CIVIC_API_KEY=your_key`
- Restart dev server

### "No election data available"

**Reasons:**

- No upcoming elections in that area
- Data not yet available for future elections
- Address outside the United States

**Solution:**

- Try a different address
- Check closer to election dates
- Use test election ID (2000)

### No contests showing

**Reasons:**

- Election data not yet finalized
- Test election has limited data
- API returned incomplete information

**Solution:**

- Contest data appears closer to elections
- Try different addresses
- Check during active election periods

### Missing candidate photos

**Note:** Not all candidates provide photos to the API. This is normal and doesn't indicate an error.

## API Rate Limits

### Google Civic Information API

- **Free Tier**: 25,000 requests per day
- **Rate**: No specific per-second limit
- **Cost**: Free for most use cases

### Best Practices

- Cache results when possible
- Don't make excessive requests
- Implement reasonable rate limiting

## Technical Implementation

### Files Structure

```
app/
├── polling-station/
│   └── page.tsx              # Main UI component
└── api/
    └── polling-location/
        └── route.ts          # API endpoint
```

### API Route (`/api/polling-location/route.ts`)

**Responsibilities:**

- Validate input address
- Call Google Civic API
- Transform response data
- Extract election officials
- Handle errors gracefully

**Key Functions:**

- `GET()`: Main request handler
- `extractElectionOfficials()`: Parse official data
- `extractAdminInfo()`: Format admin information

### Page Component (`/polling-station/page.tsx`)

**Features:**

- Search form with validation
- Tab-based navigation
- Responsive location cards
- Candidate display with party colors
- Official contact information
- Google Maps integration

**State Management:**

- `address`: User input
- `loading`: Request status
- `error`: Error messages
- `pollingData`: API response
- `activeTab`: Current view

## Security & Privacy

### API Key Security

- ✅ Environment variables
- ✅ Server-side API route option
- ✅ Not exposed in client code
- ⚠️ `NEXT_PUBLIC_` prefix exposes to browser

### User Privacy

- No personal data stored
- No tracking or analytics
- Address only sent to Google API
- No database or logging

## Future Enhancements

### Potential Features

1. **Geolocation**: Auto-detect user location
2. **Voter Registration**: Check registration status
3. **Sample Ballot**: Full ballot preview
4. **Candidate Comparison**: Side-by-side comparison tool
5. **Reminders**: Election day notifications
6. **Share Results**: Share polling location with others
7. **Accessibility**: Enhanced accessibility features
8. **Multi-language**: Support for multiple languages

### Performance Improvements

1. Response caching
2. Image optimization
3. Lazy loading
4. Service worker for offline support

## Support Resources

### Documentation

- [Google Civic Information API Docs](https://developers.google.com/civic-information)
- [API Reference](https://developers.google.com/civic-information/docs/v2)
- [Next.js Documentation](https://nextjs.org/docs)

### Common Issues

- [API Troubleshooting Guide](https://developers.google.com/civic-information/docs/v2/troubleshooting)
- [Error Codes Reference](https://developers.google.com/civic-information/docs/v2/errors)

## Summary

The Polling Station Lookup feature provides a comprehensive, user-friendly interface for voters to:

✅ Find their polling locations  
✅ Research candidates and ballot measures  
✅ Contact election officials  
✅ Access voter resources  
✅ Get directions to voting locations

All powered by the Google Civic Information API with your configured API key.

---

**Status**: ✅ Fully Implemented and Ready to Use  
**API Required**: Google Civic Information API  
**Setup Time**: 5 minutes  
**User Experience**: Comprehensive and intuitive
