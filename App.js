import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './components/WelcomePage'; // Adjust the path as needed
import UserTypeSelectionPage from './components/UserTypeSelectionPage';
import RoleBasedAuthPage from './components/RoleBasedAuthPage'; // Adjust path as needed
import DriverPage from './components/driver/DriverPage';
import OrganizationPage from './components/organisation/OrganizationPage';
import TechnicianPage from './components/technician/TechnicianPage';
import RegisterPage from './components/driver/RegisterPage'; // Add this import
import TireMonitoring from './components/organisation/TireMonitoring';
import OrganisationCheckPage from './components/driver/OrganisationCheckPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="UserTypeSelectionPage" component={UserTypeSelectionPage} />
        <Stack.Screen name="RoleBasedAuthPage" component={RoleBasedAuthPage} />
        <Stack.Screen name="DriverPage" component={DriverPage} />
        <Stack.Screen name="OrganizationPage" component={OrganizationPage} />
        <Stack.Screen name="TechnicianPage" component={TechnicianPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="OrganisationCheckPage" component={OrganisationCheckPage}/>
       
        
        <Stack.Screen name="TireMonitoring" component={TireMonitoring} />
        
      


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;