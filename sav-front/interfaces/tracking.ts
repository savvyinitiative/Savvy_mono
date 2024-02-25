interface XAPIStatement {
  actor: string;
  verb: string;
  object: string;
  context: string;
}

export interface IXapiStyleTrackingData {
  id: string;
  scrollPosition? : number;
  scrollComplete? : boolean;
  actor: {
    id: string;
    name: string;
    objectType: string;
  };
  verb: string;
  object: {
    id: string;
    definition: {
      name?: string;
      description?: string;
      type?: string;
    };
    child? : {
        id: string;
    }
    objectType: string;
  };
}

/*


{
  "actor": {
    "name": "Sally Glider",
    "mbox": "mailto:sally@example.com"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/completed",
    "display": { "en-US": "completed" }
  },
  "object": {
    "id": "http://example.com/activities/hang-gliding-test",
    "definition": {
      "type": "http://adlnet.gov/expapi/activities/assessment",
      "name": { "en-US": "Hang Gliding Test" },
      "description": {
        "en-US": "The Solo Hang Gliding test, consisting of a timed flight from the peak of Mount Magazine"
      },
      "extensions": {
        "http://example.com/gliderClubId": "test-435"
      }
    }
  },
  "result": {
    "completion": true,
    "success": true,
    "score": {
      "scaled": 0.95
    },
    "extensions": {
      "http://example.com/flight/averagePitch": 0.05
    }
  },
  "context": {
    "instructor": {
      "name": "Irene Instructor",
      "mbox": "mailto:irene@example.com"
    },
    "contextActivities":{
      "parent": { "id": "http://example.com/activities/hang-gliding-class-a" }
      "grouping": { "id": "http://example.com/activities/hang-gliding-school" }
    },
    "extensions": {
      "http://example.com/weatherConditions": "rainy"
    }
  },
  "timestamp": "2012-07-05T18:30:32.360Z",
  "stored": "2012-07-05T18:30:33.540Z",
  "authority": {
    "name": "Irene Instructor",
    "mbox": "mailto:irene@example.com"
  }
}


{
account: {
homePage: "http://twitter.com",
name: "projecttincan"
},
objectType: "Agent"
}

{
id: "http://adlnet.gov/expapi/verbs/experienced",
display: {
"en-US": "experienced"
}
}

{
"id” : “http://tincanapi.com/GolfExample_TCAPI/GolfAssessment.html",
"definition": {
"name": {
"en-US": "Golf Example Assessment”
},
"description": {
"en-US": "An Assessment for the Golf Example course.”
},
"type": "http://adlnet.gov/expapi/activities/assessment"
},
"objectType": "Activity"
}




*/
