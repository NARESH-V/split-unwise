# Split-Unwise 💰

A modern, intuitive expense splitting application built with React and TypeScript. Split expenses with friends, track who owes what, and manage group finances effortlessly.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)

## ✨ Features

### 🔐 Authentication
- **Google OAuth Integration**: Secure login using Google accounts
- **Auto-registration**: New users are automatically registered on first login
- **Persistent Sessions**: Stay logged in across browser sessions

### 👥 Group Management
- **Create Groups**: Set up expense groups for trips, roommates, or any shared expenses
- **Add Members**: Invite multiple members with names and email addresses
- **Member Roles**: Admins and regular members with visual indicators
- **Group Details**: Add descriptions and manage group information
- **Stacked Avatar Display**: Visual representation of up to 7 members with "+N" indicator

### 💸 Expense Tracking
- **Quick Expense Entry**: Simple form to add expenses in seconds
- **14 Expense Categories**: Categorize expenses with intuitive icons:
  - 🍽️ Food & Dining
  - 🛒 Groceries
  - 🚗 Transportation
  - 🎬 Entertainment
  - 👜 Shopping
  - ⚡ Utilities
  - 🏠 Rent
  - 🏥 Healthcare
  - ✈️ Travel
  - 🎓 Education
  - 💪 Sports & Fitness
  - 🧾 Bills & Services
  - 🎁 Gifts
  - ⋯ Other

### 📊 Split Methods
- **Equal Split**: Split expenses equally among all participants
  - Interactive checkboxes to include/exclude members
  - Real-time amount calculation
- **Unequal Split**: Manually specify each person's share
  - Balance tracking to ensure amounts add up
  - Visual indicators for remaining balance
- **Percentage Split**: Split by percentage with automatic amount calculation
  - Percentage validation
  - Real-time amount updates

### 💰 Balance Tracking
- **Overall Balance**: See at a glance if you're owed or owing
- **Individual Balances**: Detailed breakdown by person
- **Color-Coded Status**: 
  - Green for amounts owed to you
  - Red for amounts you owe
  - Gray for settled/not involved
- **Real-time Calculations**: Balances update automatically with new expenses

### 📱 User Interface
- **Material Design**: Modern, clean interface using Material-UI
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Bottom Navigation**: Quick access to Groups, Activity, and Profile
- **Floating Action Button**: Add expenses from anywhere
- **Search & Filter**: Easy navigation through expenses
- **Visual Feedback**: Icons, colors, and animations for better UX

### 💾 Data Persistence
- **Local Storage Database**: All data persists in browser local storage
- **No Backend Required**: Runs entirely in the browser
- **Sample Data**: Pre-populated with sample groups and expenses
- **Export/Import Ready**: Easy to extend for data export functionality

### 📋 Expense Details
- **Full Expense View**: Click any expense to see complete details
- **Split Breakdown**: See exactly how each expense is divided
- **Payment Status**: Track who has paid and who hasn't
- **Date & Time**: Automatic timestamp for each expense
- **Category Display**: Visual category identification

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/split-unwise.git
   cd split-unwise
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🏗️ Project Structure

```
split-unwise/
├── public/               # Static files
├── src/
│   ├── common/          # Shared utilities and models
│   │   ├── constants.tsx
│   │   └── models.ts
│   ├── components/      # Reusable components
│   │   ├── groupListItem.tsx
│   │   ├── menuBar.tsx
│   │   └── navBar.tsx
│   ├── dialogs/         # Dialog components
│   │   ├── addExpense.tsx
│   │   ├── adjustSplit.tsx
│   │   ├── createGroup.tsx
│   │   ├── expenseDetail.tsx
│   │   └── tabs/
│   │       ├── equalSplit.tsx
│   │       ├── unEqualSplit.tsx
│   │       └── percentageSplit.tsx
│   ├── pages/           # Main page components
│   │   ├── activity.tsx
│   │   ├── groupExpense.tsx
│   │   ├── groups.tsx
│   │   ├── login.tsx
│   │   ├── profile.tsx
│   │   └── register.tsx
│   ├── services/        # API and data services
│   │   ├── groupService.ts
│   │   ├── userService.ts
│   │   ├── httpWrapper.ts
│   │   └── localStorageDB.ts
│   ├── store/           # Redux state management
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.ts
│   ├── App.js
│   └── index.js
└── package.json
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Authentication**: Google OAuth (react-oauth/google)
- **Styling**: Styled Components & Material-UI
- **Data Storage**: Browser LocalStorage
- **Build Tool**: Create React App

## 📖 Usage Guide

### Creating a Group

1. Click the "+" button in the top-right corner
2. Enter group name and description
3. Add members by entering their name and email
4. Click "Done" to create the group

### Adding an Expense

1. Navigate to a group
2. Click the "+" floating action button
3. Select a category by clicking the category icon
4. Enter description and amount
5. Choose who paid for the expense
6. Click "Split" to adjust the split method if needed
7. Click "Done" to save the expense

### Adjusting Split Method

1. In the add expense form, click the "Split" button
2. Choose your split method:
   - **Equally**: Check/uncheck members to include
   - **Unequally**: Enter custom amounts for each person
   - **By Percentage**: Specify percentage for each person
3. Click "Done" to apply

### Viewing Balances

- **Group Page**: See overall and individual balances at the top
- **Expense List**: Each expense shows your personal status
- **Expense Details**: Click any expense for full breakdown

## 🎨 Features in Detail

### Smart Balance Calculation
The app automatically calculates balances considering:
- Who paid for each expense
- Who is included in each split
- Multiple split methods (equal, unequal, percentage)
- Settles amounts between all group members

### Local Storage Database
All data is stored locally in your browser:
- **Users**: Profile information and Google OAuth data
- **Groups**: Group details and member lists
- **Expenses**: All expense records with split details
- **Activities**: Recent activity feed

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for various screen sizes
- Native-feeling navigation

## 🔒 Privacy & Security

- All data stored locally in your browser
- No data sent to external servers (except Google OAuth)
- No tracking or analytics
- Full control over your data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- Local storage has size limits (typically 5-10MB)
- Data is not synced across devices
- Clearing browser data will delete all information

## 🚧 Future Enhancements

- [ ] Cloud sync across devices
- [ ] Export data to CSV/PDF
- [ ] Payment reminders
- [ ] Currency conversion
- [ ] Receipt photo upload
- [ ] Settlement suggestions
- [ ] Recurring expenses
- [ ] Group statistics and insights

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using React and Material-UI**
