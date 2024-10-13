import texts from "./text-copy.json" assert { type: "json" };

type Event =
  | {
      type: "view";
      view: {
        name: string;
      };
    }
  | {
      type: "action";
      action: {
        target: {
          name: string;
        };
      };
    }
  | {
      type: "resource";
      resource: {
        url: string;
      };
    }
  | {
      type: "vital";
      vital: {
        name: string;
      };
    }
  | {
      type: "long_task";
      long_task: {
        duration: number;
      };
    };

export function getEventName(event: Event) {
  switch (event.type) {
    case "view":
      return event.view.name;
    case "action":
      return event.action.target.name;
    case "resource":
      return event.resource.url;
    case "vital":
      return event.vital.name;
    case "long_task":
      return `${event.long_task.duration / 1_000_000}
        ${texts.eventsList.longTask.unit}`;
    default:
      return texts.eventPreview.unnamedEvent;
  }
}
