import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const { user: { company, fairs } } = state;
  
  return {
    company,
    fairs
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyList: (fair_id) => {
    dispatch(userActions.getCompanyList(fair_id));
  },
  getFairs: () => {
    dispatch(userActions.getFairs());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);