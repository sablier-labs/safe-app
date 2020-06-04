import React from "react";
import { Select, Text } from "@gnosis.pm/safe-react-components";

import { SelectContainer } from "../../theme/components";

export type IntegerOption = {
  id: string;
  label: string;
};

const integerOptions = (max: number): IntegerOption[] => {
  return Array.from(Array(max).keys()).map((index: number) => {
    return { id: index.toString(), label: index.toString() };
  });
};

const daysOption: IntegerOption[] = integerOptions(366);
const hoursOption: IntegerOption[] = integerOptions(24);
const minutesOption: IntegerOption[] = integerOptions(60);

export type StreamLength = {
  days: string;
  hours: string;
  minutes: string;
};

export type Props = {
  readonly error?: string;
  readonly onStreamLengthChange: Function;
  readonly streamLength: StreamLength;
};

function StreamLengthInput(props: Props) {
  return (
    <>
      <Text size="md" color="error">
        {props.error}
      </Text>
      <SelectContainer>
        <Select
          items={daysOption}
          activeItemId={props.streamLength.days}
          onItemClick={(id: string): void => props.onStreamLengthChange(id, "days")}
        />
        <Text strong size="lg">
          Days
        </Text>
      </SelectContainer>

      <SelectContainer>
        <Select
          items={hoursOption}
          activeItemId={props.streamLength.hours}
          onItemClick={(id: string): void => props.onStreamLengthChange(id, "hours")}
        />
        <Text strong size="lg">
          Hours
        </Text>
      </SelectContainer>

      <SelectContainer>
        <Select
          items={minutesOption}
          activeItemId={props.streamLength.minutes}
          onItemClick={(id: string): void => props.onStreamLengthChange(id, "minutes")}
        />
        <Text strong size="lg">
          Minutes
        </Text>
      </SelectContainer>
    </>
  );
}

export default StreamLengthInput;
