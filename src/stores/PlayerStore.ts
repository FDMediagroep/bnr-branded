import { ReSubstitute } from '@fdmg/resubstitute';

class MoreMenuStore extends ReSubstitute {
    private _audioUrl: string;

    setAudioUrl(audioUrl: string) {
        this._audioUrl = audioUrl;
        this.trigger();
    }

    getAudioUrl() {
        return this._audioUrl;
    }
}

export default new MoreMenuStore();
