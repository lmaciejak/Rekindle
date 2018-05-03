import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router'

class Rekindle extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      fetchingUser: true,
    }
  }

  render() {
    const { user } = this.state
    return (
     <div>
      <Switch>
        <Route exact path='/cb/groups' render={this.renderGroups} />
        <Route path='/cb/potluck/:potluckID' render={this.renderPotluck} />
        <Route path='/cb/potlucks' render={this.renderPotluckList} />
        <Route path='/cb/groups/:groupID' component={Groups} />
        <Route exact path='/cb/profile/:id' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/favorites' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/edit' component={UserEdit} />
        <Route path='/cb/addrecipe' render={this.renderAddRecipe} />
        <Route path='/cb/editRecipe/:recipeID' component={EditRecipe} />
        <Route exact path='/cb/:userID/:recipeID' render={this.renderSingleRecipe} />
        <Route path='/cb/:userID/:recipeID/edit' component={Recipe} />
        <Route exact path='/cb/feed' render={this.renderUserFeed} />
      </Switch>
    </div> )
  }
}

export default Rekindle