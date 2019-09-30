import { createFormValidation } from '@lemoncode/fonk';
import { charsNotBlackList } from '@lemoncode/fonk-chars-not-black-list-validator';

const validationSchema = {
  field: {
    myField: [
      {
        validator: charsNotBlackList.validator,
        customArgs: { blackList: ['t', 'e', 's', 't'], matchCase: true },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

Promise.all([
  formValidation.validateField('myField', 'hello test'),
  formValidation.validateField('myField', 'HELLO TEST'),
]).then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example with failed result:</h2>

<pre>
  formValidation.validateField('myField', 'hello test')
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;">
  <h2>Example with succeeded result:</h2>

<pre>
formValidation.validateField('myField', 'HELLO TEST')
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
`;
});
