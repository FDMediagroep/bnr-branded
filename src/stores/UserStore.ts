import { ReSubstitute } from '@fdmg/resubstitute';

class UserStore extends ReSubstitute {
    private _userData: any;

    setUserData(userData: any) {
        if (userData && !userData.data) {
            userData.data = { podcasts: [], episodes: [] };
        }
        this._userData = userData;
        console.log(this._userData);
        this.trigger();
    }

    getUserData() {
        return this._userData;
    }
}

export default new UserStore();
