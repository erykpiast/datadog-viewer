import { type ComponentProps } from "react";

import "./EventPreviewOverview.css";

import * as texts from "./text-copy.json" assert { type: "json" };

import { Accordion } from "./Accordion";

function ActionEventOverview({
  event,
}: {
  event: {
    action: {
      target: {
        name: string;
      };
      type: string;
    };
  };
}) {
  return (
    <>
      <Accordion summary={texts.eventPreview.tabs.overview.sections.general}>
        <dl>
          <dt>{texts.eventPreview.tabs.overview.action.type}</dt>
          <dd>{event.action.type}</dd>
          <dt>{texts.eventPreview.tabs.overview.action.targetName}</dt>
          <dd>{event.action.target.name}</dd>
        </dl>
      </Accordion>
    </>
  );
}

function LongTaskEventOverview({
  event,
}: {
  event: {
    long_task: {
      duration: number;
    };
  };
}) {
  return (
    <>
      <Accordion summary={texts.eventPreview.tabs.overview.sections.general}>
        <dl>
          <dt>{texts.eventPreview.tabs.overview.longTask.duration.label}</dt>
          <dd>
            {event.long_task.duration !== undefined
              ? `${Math.round(event.long_task.duration / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.longTask.duration.unit
                }`
              : texts.eventPreview.tabs.overview.longTask.duration.missing}
          </dd>
        </dl>
      </Accordion>
    </>
  );
}

function ResourceEventOverview({
  event,
}: {
  event: {
    resource: {
      duration?: number;
      decoded_body_size?: number;
      encoded_body_size?: number;
      render_blocking_status: string;
      size?: number;
      status_code?: number;
      transfer_size?: number;
      type: string;
      url: string;
    };
  };
}) {
  return (
    <>
      <Accordion summary={texts.eventPreview.tabs.overview.sections.general}>
        <dl>
          <dt>{texts.eventPreview.tabs.overview.resource.type}</dt>
          <dd>{event.resource.type}</dd>
          <dt>{texts.eventPreview.tabs.overview.resource.url}</dt>
          <dd>{event.resource.url}</dd>
          <dt>{texts.eventPreview.tabs.overview.resource.statusCode.label}</dt>
          <dd>
            {event.resource.status_code !== undefined
              ? event.resource.status_code
              : texts.eventPreview.tabs.overview.resource.statusCode.missing}
          </dd>
          <dt>
            {texts.eventPreview.tabs.overview.resource.renderBlockingStatus}
          </dt>
          <dd>{event.resource.render_blocking_status}</dd>
          <dt>{texts.eventPreview.tabs.overview.resource.duration.label}</dt>
          <dd>
            {event.resource.duration !== undefined
              ? `${Math.round(event.resource.duration / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.resource.duration.unit
                }`
              : texts.eventPreview.tabs.overview.resource.duration.missing}
          </dd>
        </dl>
      </Accordion>
      <Accordion
        summary={texts.eventPreview.tabs.overview.sections.resourceSizes}
      >
        <dl>
          <dt>{texts.eventPreview.tabs.overview.resource.sizes.size.label}</dt>
          <dd>
            {event.resource.size !== undefined
              ? `${Math.round(event.resource.size / 1_024)} ${
                  texts.eventPreview.tabs.overview.resource.sizes.size.unit
                }`
              : texts.eventPreview.tabs.overview.resource.sizes.size.missing}
          </dd>
          <dt>
            {texts.eventPreview.tabs.overview.resource.sizes.transferSize.label}
          </dt>
          <dd>
            {event.resource.transfer_size !== undefined
              ? `${Math.round(event.resource.transfer_size / 1_024)} ${
                  texts.eventPreview.tabs.overview.resource.sizes.transferSize
                    .unit
                }`
              : texts.eventPreview.tabs.overview.resource.sizes.transferSize
                  .missing}
          </dd>
          <dt>
            {
              texts.eventPreview.tabs.overview.resource.sizes.encodedBodySize
                .label
            }
          </dt>
          <dd>
            {event.resource.encoded_body_size !== undefined
              ? `${Math.round(event.resource.encoded_body_size / 1_024)} ${
                  texts.eventPreview.tabs.overview.resource.sizes
                    .encodedBodySize.unit
                }`
              : texts.eventPreview.tabs.overview.resource.sizes.encodedBodySize
                  .missing}
          </dd>
          <dt>
            {
              texts.eventPreview.tabs.overview.resource.sizes.decodedBodySize
                .label
            }
          </dt>
          <dd>
            {event.resource.decoded_body_size !== undefined
              ? `${Math.round(event.resource.decoded_body_size / 1_024)} ${
                  texts.eventPreview.tabs.overview.resource.sizes
                    .decodedBodySize.unit
                }`
              : texts.eventPreview.tabs.overview.resource.sizes.decodedBodySize
                  .missing}
          </dd>
        </dl>
      </Accordion>
    </>
  );
}

function ViewEventOverview({
  event,
}: {
  event: {
    view: {
      dom_complete?: number;
      dom_content_loaded?: number;
      dom_interactive?: number;
      first_byte?: number;
      first_contentful_paint?: number;
      is_active: boolean;
      loading_type: string;
      loading_time?: number;
      name: string;
      url: string;
    };
  };
}) {
  return (
    <>
      <Accordion summary={texts.eventPreview.tabs.overview.sections.general}>
        <dl>
          <dt>{texts.eventPreview.tabs.overview.eventName}</dt>
          <dd>{event.view.name}</dd>
          <dt>{texts.eventPreview.tabs.overview.url}</dt>
          <dd>{event.view.url}</dd>
          <dt>{texts.eventPreview.tabs.overview.loadingType}</dt>
          <dd>{event.view.loading_type}</dd>
        </dl>
      </Accordion>
      <Accordion
        summary={texts.eventPreview.tabs.overview.sections.performance}
      >
        <dl>
          <dt>{texts.eventPreview.tabs.overview.firstByte.label}</dt>
          <dd>
            {event.view.first_byte !== undefined
              ? `${Math.round(event.view.first_byte / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.firstByte.unit
                }`
              : "-"}
          </dd>
          <dt>{texts.eventPreview.tabs.overview.domInteractive.label}</dt>
          <dd>
            {event.view.dom_interactive !== undefined
              ? `${Math.round(event.view.dom_interactive / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.domInteractive.unit
                }`
              : "-"}
          </dd>
          <dt>{texts.eventPreview.tabs.overview.domContentLoaded.label}</dt>
          <dd>
            {event.view.dom_content_loaded !== undefined
              ? `${Math.round(event.view.dom_content_loaded / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.domContentLoaded.unit
                }`
              : "-"}
          </dd>
          <dt>{texts.eventPreview.tabs.overview.domComplete.label}</dt>
          <dd>
            {event.view.dom_complete !== undefined
              ? `${Math.round(event.view.dom_complete / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.domComplete.unit
                }`
              : "-"}
          </dd>
          <dt>{texts.eventPreview.tabs.overview.firstContentfulPaint.label}</dt>
          <dd>
            {event.view.first_contentful_paint !== undefined
              ? `${Math.round(event.view.first_contentful_paint / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.firstContentfulPaint.unit
                }`
              : "-"}
          </dd>
          <dt>{texts.eventPreview.tabs.overview.loadingTime.label}</dt>
          <dd>
            {event.view.loading_time !== undefined
              ? `${Math.round(event.view.loading_time / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.loadingTime.unit
                }`
              : "-"}
          </dd>
        </dl>
      </Accordion>
    </>
  );
}

function VitalEventOverview({
  event,
}: {
  event: {
    vital: {
      description: string;
      duration?: number;
      name: string;
      type: string;
    };
  };
}) {
  return (
    <>
      <Accordion summary={texts.eventPreview.tabs.overview.sections.general}>
        <dl>
          <dt>{texts.eventPreview.tabs.overview.vital.type}</dt>
          <dd>{event.vital.type}</dd>
          <dt>{texts.eventPreview.tabs.overview.vital.name}</dt>
          <dd>{event.vital.name}</dd>
          <dt>{texts.eventPreview.tabs.overview.vital.description}</dt>
          <dd>{event.vital.description}</dd>
          <dt>{texts.eventPreview.tabs.overview.vital.duration.label}</dt>
          <dd>
            {event.vital.duration !== undefined
              ? `${Math.round(event.vital.duration / 1_000_000)} ${
                  texts.eventPreview.tabs.overview.vital.duration.unit
                }`
              : "-"}
          </dd>
        </dl>
      </Accordion>
    </>
  );
}

function UnknownEventOverview() {
  return (
    <p className="unknown-event">
      <strong>{texts.eventPreview.tabs.overview.unknownEvent.heading}</strong>
      <br />
      {texts.eventPreview.tabs.overview.unknownEvent.description}
    </p>
  );
}

export function EventPreviewOverview({
  className,
  event,
}: {
  className: string;
  event:
    | (ComponentProps<typeof ActionEventOverview>["event"] & { type: "action" })
    | (ComponentProps<typeof LongTaskEventOverview>["event"] & {
        type: "long_task";
      })
    | (ComponentProps<typeof ResourceEventOverview>["event"] & {
        type: "resource";
      })
    | (ComponentProps<typeof ViewEventOverview>["event"] & { type: "view" })
    | (ComponentProps<typeof VitalEventOverview>["event"] & { type: "vital" });
}): JSX.Element {
  return (
    <section className={`${className} event-preview-overview`}>
      {event.type === "action" ? <ActionEventOverview event={event} /> : null}
      {event.type === "long_task" ? (
        <LongTaskEventOverview event={event} />
      ) : null}
      {event.type === "resource" ? (
        <ResourceEventOverview event={event} />
      ) : null}
      {event.type === "view" ? <ViewEventOverview event={event} /> : null}
      {event.type === "vital" ? <VitalEventOverview event={event} /> : null}
      {!isKnownEventType(event.type) ? <UnknownEventOverview /> : null}
    </section>
  );
}

export function isKnownEventType(
  type: string
): type is "action" | "long_task" | "resource" | "view" | "vital" {
  return ["action", "long_task", "resource", "view", "vital"].includes(type);
}
