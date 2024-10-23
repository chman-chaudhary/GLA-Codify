const Problems = [
  {
    id: 1,
    slug: "add-two-numbers",
    fullBoilerCode: {
      java: `import java.io.*;
import java.util.*;

public class Main {
    
    USER_CODE_HERE

    public static void main(String[] args) {
        int num1 = Integer.valueOf(input_0);
        int num2 = Integer.valueOf(input_1);
        int result = TwoSum(num1, num2);
        System.out.println(result);
    }
}`,
      python: `USER_CODE_HERE

num1 = int(input_0)
num2 = int(input_1)

result = TwoSum(num1, num2)
print(result)`,
      javascript: `USER_CODE_HERE;

const num1 = parseInt(input_0);
const num2 = parseInt(input_1);

const result = twoSum(num1, num2);
console.log(result);`,
    },
    testcases: [
      {
        inputs: [2, 3],
        output: 5,
      },
      {
        inputs: [0, 1],
        output: 1,
      },
      {
        inputs: [500, 1000],
        output: 1500,
      },
      {
        inputs: [0, 0],
        output: 0,
      },
      {
        inputs: [95, 5],
        output: 100,
      },
    ],
  },
  {
    id: 2,
    slug: "max-element-array",
    fullBoilerCode: {
      java: `import java.io.*;
import java.util.*;

public class Main {

    USER_CODE_HERE

    public static int[] processInput(String input) {
        String[] parts = input.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        return nums;
    }

    public static void main(String[] args) {
        // Reading the array elements
        int[] nums = {input_0};

        // Calling the function and printing the result
        int result = findMax(nums);
        System.out.println(result);
    }
}`,
      python: `USER_CODE_HERE

def process_input(input_string):
    try:
        nums = [int(num.strip()) for num in input_string.split(',')]
        return nums
    except ValueError as e:
        print(f"Error: {e}")
        return []

nums = process_input(input_0)

result = find_max(nums)
print(result)`,
      javascript: `USER_CODE_HERE;

function processInput(inputString) {
    try {
        const inputArray = inputString.split(',').map(num => num.trim());

        const nums = inputArray.map(num => {
            const parsedNum = Number(num);
            if (isNaN(parsedNum)) {
                throw new Error("Invalid input:" + num + " is not a number");
            }
            return parsedNum;
        });

        return nums;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

const nums = processInput(input_0);;

const result = findMax(nums);
console.log(result);`,
    },
    testcases: [
      {
        inputs: ["5, 1, 8, 4, 2"],
        output: "8",
      },
      {
        inputs: ["-5, -10, -3, -7, -1"],
        output: "-1",
      },
      {
        inputs: ["1, 10"],
        output: "10",
      },
      {
        inputs: ["3, 3, 3, 3, 3, 3"],
        output: "3",
      },
      {
        inputs: ["-2, -8, 0, 3, 7, -1"],
        output: "7",
      },
      {
        inputs: ["1000000000, -1000000000, 500, 0, 999999999"],
        output: "1000000000",
      },
      {
        inputs: ["0, 0, 0, 0"],
        output: "0",
      },
      {
        inputs: ["1, 2, 3, 4, 5, 6, 7"],
        output: "7",
      },
      {
        inputs: ["9, 8, 7, 6, 5, 4, 3"],
        output: "9",
      },
      {
        inputs: ["999999999, 1000000000, 999999998, 999999997, 999999996"],
        output: "999999999",
      },
    ],
  },
];

export default Problems;
