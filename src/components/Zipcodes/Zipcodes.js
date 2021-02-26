import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function Zipcodes(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('in useEffect');
    dispatch({
      type: 'FETCH_ZIPCODES'
    });
  }, [dispatch]);


  return (
    <div>
      <h1>List of Zipcodes</h1>
      <div className="zipcodes">
        {props.store.zipcodes.map(zipcode =>
          <p key={zipcode.zipcode}>Addresses in zipcode, {zipcode.zipcode}: {zipcode.numOfAddresses}</p>
        )}
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(Zipcodes);
