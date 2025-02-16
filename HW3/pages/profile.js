/**
 * Profile - user profile page.
 */
import { useProfile } from '../hooks/profile/useProfile';
import { ProfileInfo } from '../components/profile-info/ProfileInfo';
import { UserRecipes } from '../components/profile-info/UserRecipes';

export default function Profile() {
  const {
    user,
    loading,
    recipesLoading,
    userRecipes,
    handleDeleteRecipe
  } = useProfile();

  // If user is not logged in, prompt to log in
  if (!user) return <div>Please log in to view your profile</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Display user profile information */}
      <ProfileInfo user={user} />

      {/* Display user's saved recipes with loading state and delete functionality */}
      <UserRecipes 
        recipes={userRecipes}
        loading={recipesLoading}
        onRemove={handleDeleteRecipe}
      />
    </div>
  );
}