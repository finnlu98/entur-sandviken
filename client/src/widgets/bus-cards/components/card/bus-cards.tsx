import moment from 'moment';
import BusCard from './bus-card';
import React from 'react';
import './bus-cards.css';
import type { TripPatterns } from '../../model/travel-response';
import ImageCircle from '../../../../core/shared/image-cirlce/image-circle';
import { TripIdentifier } from '../../model/enum/trip-identifier';
import type { TravelRoute } from '../../travel-card-widget';
import { Mode } from '../../model/enum/mode';

interface BusCardsProps {
  tripIdentifier: TripIdentifier;
  travelRoute: TravelRoute;
  tripPatterns: TripPatterns[] | undefined;
}

const BusCards: React.FC<BusCardsProps> = ({ tripIdentifier, travelRoute, tripPatterns }) => {
  function calculateMinutesUntil(startTime: string) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, 'minutes');
    return diffInMinutes;
  }

  function filterBusRides(tripPatterns: TripPatterns[] | undefined): TripPatterns[] {
    if (tripPatterns === undefined || !tripPatterns) return [];

    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            leg.mode.toUpperCase() !== Mode.Foot &&
            leg.mode.toUpperCase() !== Mode.Leg &&
            calculateMinutesUntil(leg.expectedStartTime) >= 10
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);
  }

  return (
    <div className="h-column">
      {tripIdentifier === TripIdentifier.Title && (
        <div className="trip-identifier">
          <p>
            {travelRoute.startPlace.properties.name} - {travelRoute.stopPlace.properties.name}{' '}
          </p>
        </div>
      )}
      <div className="bus-cards">
        {tripIdentifier === TripIdentifier.Img && (
          <ImageCircle imgPath={travelRoute.imgIdentifier} alt="Bus stop arrival" />
        )}

        {tripPatterns &&
          filterBusRides(tripPatterns)
            .slice(0, 3)
            .map((tripPattern) => {
              return (
                <BusCard
                  key={tripPattern.legs[0].expectedStartTime}
                  publicCode={tripPattern.legs[0].line.publicCode}
                  mode={tripPattern.legs[0].mode}
                  startTime={tripPattern.legs[0].expectedStartTime}
                  minutesUntil={calculateMinutesUntil(tripPattern.legs[0].expectedStartTime)}
                  calculateMinutesUntil={calculateMinutesUntil}
                  configColor={travelRoute.configColor}
                />
              );
            })}
      </div>
    </div>
  );
};

export default BusCards;
