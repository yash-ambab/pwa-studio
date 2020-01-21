import { connect } from 'src/drivers';
import Newsletter from './newsletter';

import { signUpForNewsletter } from '@magento/peregrine/lib/store/actions/newsletter';

const mapStateToProps = ({ newsletter }) => {
    const { isInProgress, isError, isSuccess } = newsletter;

    return {
        isInProgress,
        isError,
        isSuccess
    };
};

const mapDispatchToProps = {
    signUpForNewsletter
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Newsletter);