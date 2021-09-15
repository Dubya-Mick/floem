import uniqid from 'uniqid';
const LINE_BREAK = 'LINE_BREAK';

export const dummyUserObj = {
  username: 'Jimmy',
  poems: [
    {
      rawPoem: `Tiger, tiger, burning bright
      In the forests of the night,
      What immortal hand or eye
      Could frame thy fearful symmetry?`,
      title: 'The Tyger',
      id: uniqid(),
      isStuttering: false,
      stanza:  [
        {id: uniqid(), text: "Tiger,", spin: false},
        {id: uniqid(), text: "tiger,", spin: false},
        {id: uniqid(), text: "burning", spin: true},
        {id: uniqid(), text: "bright", spin: false},
        LINE_BREAK,
        {id: uniqid(), text: "In", spin: false},
        {id: uniqid(), text: "the", spin: false},
        {id: uniqid(), text: "forests", spin: false},
        {id: uniqid(), text: "of", spin: true},
        {id: uniqid(), text: "the", spin: false},
        {id: uniqid(), text: "night,", spin: false},
        LINE_BREAK,
        {id: uniqid(), text: "What", spin: false},
        {id: uniqid(), text: "immortal", spin: false},
        {id: uniqid(), text: "hand", spin: false},
        {id: uniqid(), text: "or", spin: false},
        {id: uniqid(), text: "eye", spin: false},
        LINE_BREAK,
        {id: uniqid(), text: "Could", spin: false},
        {id: uniqid(), text: "frame", spin: true},
        {id: uniqid(), text: "thy", spin: false},
        {id: uniqid(), text: "fearful", spin: false},
        {id: uniqid(), text: "symmetry?", spin: false},
      ]
    },
    {
      title: 'The Tyger2',
      rawPoem: `Tiger, tiger, burning bright
      In the forests of the night,
      What immortal hand or eye
      Could frame thy fearful symmetry?`,
      id: uniqid(),
      isStuttering: false,
      stanza:  [
        {id: uniqid(), text: "Tiger,", spin: true},
        {id: uniqid(), text: "tiger,", spin: false},
        {id: uniqid(), text: "burning", spin: true},
        {id: uniqid(), text: "bright", spin: false},
        LINE_BREAK,
        {id: uniqid(), text: "In", spin: false},
        {id: uniqid(), text: "the", spin: false},
        {id: uniqid(), text: "forests", spin: false},
        {id: uniqid(), text: "of", spin: true},
        {id: uniqid(), text: "the", spin: false},
        {id: uniqid(), text: "night,", spin: true},
        LINE_BREAK,
        {id: uniqid(), text: "What", spin: false},
        {id: uniqid(), text: "immortal", spin: false},
        {id: uniqid(), text: "hand", spin: false},
        {id: uniqid(), text: "or", spin: false},
        {id: uniqid(), text: "eye", spin: false},
        LINE_BREAK,
        {id: uniqid(), text: "Could", spin: false},
        {id: uniqid(), text: "frame", spin: true},
        {id: uniqid(), text: "thy", spin: true},
        {id: uniqid(), text: "fearful", spin: false},
        {id: uniqid(), text: "symmetry?", spin: false},
      ]
    }
  ]
}