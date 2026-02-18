const Problems = {
  "two-sum": {
    id: 1,
    slug: "two-sum",
    fullBoilerCode: {
      java: `import java.util.*;

public class Main {

    USER_CODE_HERE

    public static void main(String[] args) {
        int[] nums = {input_0};

        int target = Integer.valueOf(input_1);

        int[] result = twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}
`,

      python: `USER_CODE_HERE

nums = [input_0]
target = int(input_1)

result = twoSum(nums, target)
print(result[0], result[1])
`,

      javascript: `USER_CODE_HERE

const nums = [input_0];
const target = parseInt(input_1);

const result = twoSum(nums, target);
console.log(result[0], result[1]);
`,
    },

    testcases: [
      {
        inputs: ["2, 7, 11, 15", 9],
        output: "0 1",
      },
      {
        inputs: ["3, 2, 4", 6],
        output: "1 2",
      },
      {
        inputs: ["3, 3", 6],
        output: "0 1",
      },
      {
        inputs: ["1, 5, 7, 3", 8],
        output: "0 2",
      },
      {
        inputs: ["0, 4, 3, 0", 0],
        output: "0 3",
      },
    ],
  },
  "valid-parentheses": {
    id: 2,
    slug: "valid-parentheses",
    fullBoilerCode: {
      java: `import java.util.*;

public class Main {

    USER_CODE_HERE

    public static void main(String[] args) {
        String s = "input_0";

        boolean result = isValid(s);
        System.out.println(result);
    }
}
`,

      python: `USER_CODE_HERE

s = "input_0"
result = isValid(s)
print(result)
`,

      javascript: `USER_CODE_HERE

const s = "input_0";

const result = isValid(s);
console.log(result);
`,
    },

    testcases: [
      { inputs: ["()[]{}"], output: "true" },
      { inputs: ["(]"], output: "false" },
      { inputs: ["([)]"], output: "false" },
      { inputs: ["{[]}"], output: "true" },
      { inputs: ["("], output: "false" },
      { inputs: [")"], output: "false" },
      { inputs: ["((()))"], output: "true" },
      { inputs: ["(()"], output: "false" },
      { inputs: ["())"], output: "false" },
      { inputs: ["[{()}]"], output: "true" },
    ],
  },
};

export default Problems;
